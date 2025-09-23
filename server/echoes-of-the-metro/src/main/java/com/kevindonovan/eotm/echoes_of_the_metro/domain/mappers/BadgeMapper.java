package com.kevindonovan.eotm.echoes_of_the_metro.domain.mappers;

import com.kevindonovan.eotm.echoes_of_the_metro.models.Badge;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.BadgeResponse;

public class BadgeMapper {

    public static BadgeResponse toResponse(Badge badge) {
        return new BadgeResponse(badge.getBadgeId(), badge.getBadgeName(), badge.getBadgeImagePath());
    }
}
