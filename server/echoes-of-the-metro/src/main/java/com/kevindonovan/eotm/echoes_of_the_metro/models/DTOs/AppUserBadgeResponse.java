package com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs;

import com.kevindonovan.eotm.echoes_of_the_metro.models.Badge;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppUserBadgeResponse {
    private int appUserId;
    private Badge badge;
    private Timestamp dateEarned;
}
