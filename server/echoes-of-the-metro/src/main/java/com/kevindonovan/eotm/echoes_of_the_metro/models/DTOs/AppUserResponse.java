package com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppUserResponse {
    private int appUserId;
    private String username;
    private int mgr;
    private int scrap;
    private int fuel;
    private List<AppUserBadgeResponse> badgeResponses;
}
