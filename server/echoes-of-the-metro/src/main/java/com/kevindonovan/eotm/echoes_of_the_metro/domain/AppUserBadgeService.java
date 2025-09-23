package com.kevindonovan.eotm.echoes_of_the_metro.domain;

import com.kevindonovan.eotm.echoes_of_the_metro.data.AppUserBadgeRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.AppUserRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.BadgeRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.mappers.AppUserBadgeMapper;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUser;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUserBadge;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Badge;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.AppUserBadgeCreate;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.AppUserBadgeResponse;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Journal;
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

    public Result<AppUserBadgeResponse> create(AppUserBadgeCreate appUserBadgeCreate) {

        AppUserBadge appUserBadge = AppUserBadgeMapper.fromRequest(appUserBadgeCreate, appUserRepository, badgeRepository);

        Result<AppUserBadgeResponse> result = validate(appUserBadge);

        if(!result.isSuccess()) {
            return result;
        }

        if(appUserBadge.getId() != null) {
            result.addMessages("APP_USER_BADGE ID KEY CANNOT BE SET FOR `ADD` OPERATION", ResultType.INVALID);
            return result;
        }

        appUserBadge = repository.save(appUserBadge);
        result.setPayload(AppUserBadgeMapper.toResponse(appUserBadge));
        return result;
    }

    public Result<AppUserBadgeResponse> validate(AppUserBadge appUserBadge) {
        Result<AppUserBadgeResponse> result = new Result<>();

        if(appUserBadge == null) {
            result.addMessages("APP_USER_BADGE CANNOT BE NULL", ResultType.INVALID);
            return result;
        }

        if(appUserBadge.getAppUser() == null || appUserBadge.getAppUser().getAppUserId() <= 0) {
            result.addMessages("APPUSER NEEDS TO EXIST", ResultType.INVALID);
            return result;
        }

        if(appUserBadge.getBadge() == null || appUserBadge.getBadge().getBadgeId() <= 0) {
            result.addMessages("BADGE NEEDS TO EXIST", ResultType.INVALID);
            return result;
        }

        Optional<Badge> badge = badgeRepository.findById(appUserBadge.getBadge().getBadgeId());
        Optional<AppUser> appUser = appUserRepository.findById(appUserBadge.getAppUser().getAppUserId());

        if(appUser.isEmpty()) {
            result.addMessages("APPUSER DOES NOT EXIST", ResultType.INVALID);
            return result;
        }

        if(badge.isEmpty()) {
            result.addMessages("BADGE DOES NOT EXIST", ResultType.INVALID);
            return result;
        }

        return result;
    }
}
