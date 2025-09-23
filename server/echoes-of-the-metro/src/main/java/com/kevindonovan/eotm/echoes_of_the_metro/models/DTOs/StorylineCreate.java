package com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StorylineCreate {

    private String storylineTitle;
    private int appUserId;

}
