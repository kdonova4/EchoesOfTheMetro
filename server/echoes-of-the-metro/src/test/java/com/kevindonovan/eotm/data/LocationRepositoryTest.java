package com.kevindonovan.eotm.data;

import com.kevindonovan.eotm.echoes_of_the_metro.data.LocationRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Location;
import com.kevindonovan.eotm.echoes_of_the_metro.models.LocationType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class LocationRepositoryTest {

    @Autowired
    LocationRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setUp() {
        knownGoodState.set();
    }

    @Test
    void shouldFindByLocationName() {
        Optional<Location> location = repository.findByLocationName("Red Line Station");

        assertEquals(location.get().getLocationName(), "Red Line Station");
    }

    @Test
    void shouldFindByLocationType() {
        List<Location> locations = repository.findByLocationType(LocationType.STATION);

        assertEquals(1, locations.size());
    }
}
