package com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StorylineResponse {

    private int storylineId;
    private String storylineTitle;
    private AppUserResponse appUserResponse;

}
