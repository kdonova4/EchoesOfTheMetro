package com.kevindonovan.eotm.domain;

import com.kevindonovan.eotm.echoes_of_the_metro.data.LocationRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.LocationService;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Event;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Location;
import com.kevindonovan.eotm.echoes_of_the_metro.models.LocationType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class LocationServiceTest {

    @Mock
    LocationRepository repository;

    @InjectMocks
    LocationService service;

    private Location location;

    @BeforeEach
    void setup() {
        location = new Location(1, "Exhibition Station", "Artyom's home station", LocationType.STATION);
    }

    @Test
    void findByLocationName() {
        when(repository.findByLocationName(location.getLocationName())).thenReturn(Optional.of(location));

        Optional<Location> actual = service.findByLocationName(location.getLocationName());

        assertTrue(actual.isPresent());
        verify(repository).findByLocationName(location.getLocationName());
    }

    @Test
    void findByLocationType() {
        when(repository.findByLocationType(location.getLocationType())).thenReturn(
                List.of(location)
        );

        List<Location> actual = service.findByLocationType(location.getLocationType());

        assertEquals(1, actual.size());
        verify(repository).findByLocationType(location.getLocationType());
    }

}
