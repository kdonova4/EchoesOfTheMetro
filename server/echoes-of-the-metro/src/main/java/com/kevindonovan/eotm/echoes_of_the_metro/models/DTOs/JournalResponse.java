package com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs;

import com.kevindonovan.eotm.echoes_of_the_metro.models.CreatedStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JournalResponse {

    private int journalId;
    private String title;
    private String text;
    private int storylineId;
    private int appUserId;
    private int whispers;
    private int locationId;
    private Timestamp createdAt;
    private CreatedStatus createdStatus;
}
