package com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JournalCreate {

    private String title;
    private String text;
    private int storylineId;
    private int appUserId;
    private int locationId;

}
