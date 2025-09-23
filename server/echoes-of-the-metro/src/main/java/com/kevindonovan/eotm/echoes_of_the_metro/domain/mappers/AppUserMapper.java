package com.kevindonovan.eotm.echoes_of_the_metro.domain.mappers;

import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUser;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.AppUserResponse;

public class AppUserMapper {

    public static AppUserResponse toResponse(AppUser appUser) {
        return new AppUserResponse(appUser.getAppUserId(),
                appUser.getUsername(),
                appUser.getMgr(),
                appUser.getScrap(),
                appUser.getFuel(),
                AppUserBadgeMapper.toResponse(appUser.getBadges()));
    }


}
