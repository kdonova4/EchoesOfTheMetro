package com.kevindonovan.eotm.echoes_of_the_metro.data;

import com.kevindonovan.eotm.echoes_of_the_metro.models.Location;
import com.kevindonovan.eotm.echoes_of_the_metro.models.LocationType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LocationRepository extends JpaRepository<Location, Integer> {

    Optional<Location> findByLocationName(String locationName);

    List<Location> findByLocationType(LocationType locationType);

}
