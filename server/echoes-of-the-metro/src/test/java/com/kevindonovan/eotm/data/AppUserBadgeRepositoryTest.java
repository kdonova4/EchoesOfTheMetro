package com.kevindonovan.eotm.data;

import com.kevindonovan.eotm.echoes_of_the_metro.data.AppUserBadgeRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.AppUserRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.BadgeRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUser;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUserBadge;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUserBadgeKey;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Badge;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class AppUserBadgeRepositoryTest {

    @Autowired
    AppUserBadgeRepository repository;

    @Autowired
    BadgeRepository badgeRepository;

    @Autowired
    AppUserRepository appUserRepository;

    @Autowired
    KnownGoodState knownGoodState;

    private Badge badge;
    private AppUser appUser;

    @BeforeEach
    void setUp() {
        knownGoodState.set();
        badge = badgeRepository.findById(2).get();
        appUser = appUserRepository.findById(1).get();
    }

    @Test
    void shouldFindByAppUserAndBadge() {
        badge = badgeRepository.findById(1).get();
        Optional<AppUserBadge> appUserBadge = repository.findByAppUserAndBadge(appUser, badge);

        assertTrue(appUserBadge.isPresent());
    }

    @Test
    void shouldFindByAppUser() {
        List<AppUserBadge> appUserBadges = repository.findByAppUser(appUser);

        assertEquals(1, appUserBadges.size());
    }

    @Test
    void shouldCreate() {
        AppUserBadgeKey key = new AppUserBadgeKey(appUser.getAppUserId(), badge.getBadgeId());
        AppUserBadge appUserBadge = new AppUserBadge();
        appUserBadge.setId(key);
        appUserBadge.setAppUser(appUser);
        appUserBadge.setBadge(badge);

        repository.save(appUserBadge);
        assertEquals(3, repository.findAll().size());
    }
}
