package com.kevindonovan.eotm.echoes_of_the_metro.domain;

import com.kevindonovan.eotm.echoes_of_the_metro.data.AppUserBadgeRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.AppUserRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.BadgeRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUser;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUserBadge;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Badge;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppUserBadgeService {

    private final AppUserBadgeRepository repository;
    private final AppUserRepository appUserRepository;
    private final BadgeRepository badgeRepository;

    public AppUserBadgeService(AppUserBadgeRepository repository, AppUserRepository appUserRepository, BadgeRepository badgeRepository) {
        this.repository = repository;
        this.appUserRepository = appUserRepository;
        this.badgeRepository = badgeRepository;
    }

    public Optional<AppUserBadge> findByAppUserAndBadge(AppUser appUser, Badge badge) {
        return repository.findByAppUserAndBadge(appUser, badge);
    }

    public List<AppUserBadge> findByAppUser(AppUser appUser) {
        return repository.findByAppUser(appUser);
    }

    public Result<AppUserBadge> create(AppUserBadge appUserBadge) {
        return null;
    }
}
