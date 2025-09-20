package com.kevindonovan.eotm.domain;

import com.kevindonovan.eotm.echoes_of_the_metro.data.AppUserBadgeRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.AppUserRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.BadgeRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.AppUserBadgeService;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.Result;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.ResultType;
import com.kevindonovan.eotm.echoes_of_the_metro.models.*;
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
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
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
        appUserBadge = new AppUserBadge(key, appUser, badge, Timestamp.valueOf(LocalDateTime.now()));
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
        AppUserBadge mockOut = appUserBadge;
        appUserBadge.setId(null);
        when(appUserRepository.findById(appUser.getAppUserId())).thenReturn(Optional.of(appUser));
        when(badgeRepository.findById(badge.getBadgeId())).thenReturn(Optional.of(badge));
        when(repository.save(appUserBadge)).thenReturn(mockOut);

        Result<AppUserBadge> actual = service.create(appUserBadge);

        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotCreateValid() {
        Result<AppUserBadge> actual = service.create(appUserBadge);
        assertEquals(ResultType.INVALID, actual.getType());

        appUserBadge.setId(null);
        appUserBadge.setAppUser(null);
        actual = service.create(appUserBadge);
        assertEquals(ResultType.INVALID, actual.getType());

        appUserBadge.setAppUser(appUser);
        appUserBadge.setBadge(null);
        actual = service.create(appUserBadge);
        assertEquals(ResultType.INVALID, actual.getType());

        appUserBadge.setBadge(badge);
        appUserBadge.setDateEarned(Timestamp.valueOf(LocalDateTime.now().plusDays(5)));
        actual = service.create(appUserBadge);
        assertEquals(ResultType.INVALID, actual.getType());

    }

}
