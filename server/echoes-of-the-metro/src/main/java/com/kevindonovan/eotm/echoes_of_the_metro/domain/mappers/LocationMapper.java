package com.kevindonovan.eotm.echoes_of_the_metro.domain.mappers;

import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.LocationResponse;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Location;

public class LocationMapper {

    public static LocationResponse toResponse(Location location) {
        return new LocationResponse(location.getLocationId(),
                location.getLocationName(),
                location.getDescription(),
                location.getLocationType());
    }

}
