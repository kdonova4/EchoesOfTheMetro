package com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs;

import com.kevindonovan.eotm.echoes_of_the_metro.models.LocationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LocationResponse {

    private int locationId;
    private String locationName;
    private String description;
    private LocationType locationType;

}
