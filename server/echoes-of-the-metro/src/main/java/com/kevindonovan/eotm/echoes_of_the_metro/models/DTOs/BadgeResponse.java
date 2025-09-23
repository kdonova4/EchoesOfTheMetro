package com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BadgeResponse {
    private int badgeId;
    private String badgeName;
    private String badgeImagePath;
}
