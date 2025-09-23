package com.kevindonovan.eotm.echoes_of_the_metro.domain.mappers;

import com.kevindonovan.eotm.echoes_of_the_metro.data.AppUserRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.BadgeRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUser;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUserBadge;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Badge;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.AppUserBadgeCreate;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.AppUserBadgeResponse;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Journal;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

public class AppUserBadgeMapper {

    public static List<AppUserBadgeResponse> toResponse(List<AppUserBadge> badges) {
        List<AppUserBadgeResponse> appUserBadgeResponses = new ArrayList<>();
        for(AppUserBadge badge : badges) {
            appUserBadgeResponses.add(new AppUserBadgeResponse(badge.getAppUser().getAppUserId(),
                    badge.getBadge().getBadgeId(), badge.getDateEarned()));
        }

        return appUserBadgeResponses;
    }

    public static AppUserBadge fromRequest(AppUserBadgeCreate appUserBadgeCreate, AppUserRepository appUserRepository, BadgeRepository badgeRepository) {
        AppUser appUser = appUserRepository.findById(appUserBadgeCreate.getAppUserId()).orElseThrow(() -> new NoSuchElementException("User not found"));
        Badge badge = badgeRepository.findById(appUserBadgeCreate.getBadgeId()).orElseThrow(() -> new NoSuchElementException("Badge not found"));

        return new AppUserBadge(null, appUser, badge, null);
    }

    public static AppUserBadgeResponse toResponse(AppUserBadge appUserBadge) {
        return new AppUserBadgeResponse(appUserBadge.getAppUser().getAppUserId(),
                appUserBadge.getBadge().getBadgeId(),
                appUserBadge.getDateEarned());
    }
}
