package com.kevindonovan.eotm.domain;

import com.kevindonovan.eotm.echoes_of_the_metro.data.AppUserBadgeRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.AppUserRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.BadgeRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.AppUserBadgeService;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.Result;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.ResultType;
import com.kevindonovan.eotm.echoes_of_the_metro.models.*;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.AppUserBadgeCreate;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.AppUserBadgeResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AppUserBadgeServiceTest {

    @Mock
    AppUserBadgeRepository repository;

    @Mock
    AppUserRepository appUserRepository;

    @Mock
    BadgeRepository badgeRepository;

    @InjectMocks
    AppUserBadgeService service;

    private AppUserBadge appUserBadge;
    private AppUser appUser;
    private Badge badge;

    @BeforeEach
    void setup() {
        AppRole appRole = new AppRole(1, "STALKER");
        appUser = new AppUser(1, "kevin123", "kevin123@gmail.com", "85c*98Kd", 0, 0, 0, appRole, false, Collections.emptyList());
        badge = new Badge(1, "First steps", "path");
        AppUserBadgeKey key = new AppUserBadgeKey(appUser.getAppUserId(), badge.getBadgeId());
        appUserBadge = new AppUserBadge(key, appUser, badge, null);
    }

    @Test
    void shouldFindByAppUserAndBadge() {
        when(repository.findByAppUserAndBadge(appUserBadge.getAppUser(), appUserBadge.getBadge())).thenReturn(Optional.of(appUserBadge));

        Optional<AppUserBadge> actual = service.findByAppUserAndBadge(appUserBadge.getAppUser(), appUserBadge.getBadge());

        assertTrue(actual.isPresent());
        verify(repository).findByAppUserAndBadge(appUserBadge.getAppUser(), appUserBadge.getBadge());
    }

    @Test
    void shouldFindByAppUser() {
        when(repository.findByAppUser(appUserBadge.getAppUser())).thenReturn(
                List.of(appUserBadge)
        );

        List<AppUserBadge> actual = service.findByAppUser(appUserBadge.getAppUser());
        verify(repository).findByAppUser(appUserBadge.getAppUser());
    }

    @Test
    void shouldCreateValid() {
        AppUserBadgeKey key = new AppUserBadgeKey(appUser.getAppUserId(), badge.getBadgeId());
        AppUserBadge mockOut = new AppUserBadge(key, appUser, badge, Timestamp.valueOf(LocalDateTime.now()));
        appUserBadge.setId(null);

        AppUserBadgeCreate appUserBadgeCreate = new AppUserBadgeCreate(appUserBadge.getAppUser().getAppUserId(), appUserBadge.getBadge().getBadgeId());
        AppUserBadgeResponse appUserBadgeResponse = new AppUserBadgeResponse(appUserBadge.getAppUser().getAppUserId(), appUserBadge.getBadge(), Timestamp.valueOf(LocalDateTime.now()));

        when(appUserRepository.findById(appUser.getAppUserId())).thenReturn(Optional.of(appUser));
        when(badgeRepository.findById(badge.getBadgeId())).thenReturn(Optional.of(badge));
        when(repository.save(appUserBadge)).thenReturn(mockOut);

        Result<AppUserBadgeResponse> actual = service.create(appUserBadgeCreate);

        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotCreateValid() {

        AppUserBadgeCreate appUserBadgeCreate = new AppUserBadgeCreate(appUserBadge.getAppUser().getAppUserId(), appUserBadge.getBadge().getBadgeId());

        appUserBadgeCreate.setAppUserId(0);
        assertThrows(NoSuchElementException.class, () -> {
            service.create(appUserBadgeCreate);
        });

        appUserBadgeCreate.setAppUserId(1);
        appUserBadgeCreate.setBadgeId(0);
        assertThrows(NoSuchElementException.class, () -> {
            service.create(appUserBadgeCreate);
        });


    }

}
