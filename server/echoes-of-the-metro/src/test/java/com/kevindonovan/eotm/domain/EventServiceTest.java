package com.kevindonovan.eotm.domain;

import com.kevindonovan.eotm.echoes_of_the_metro.data.BadgeRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.EventRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.LocationRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.EventService;
import com.kevindonovan.eotm.echoes_of_the_metro.models.*;
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
public class EventServiceTest {

    @Mock
    EventRepository repository;

    @Mock
    LocationRepository locationRepository;

    @Mock
    BadgeRepository badgeRepository;

    @InjectMocks
    EventService service;

    private Event event;
    private Location location;
    private Badge badge;

    @BeforeEach
    void setup() {
        badge = new Badge(1, "First steps", "path");
        location = new Location(1, "Exhibition", "Artyom's home station", LocationType.STATION);
        event = new Event(1, "You found Artyom's home", EventType.STANDARD, 5, 0, 0, location, badge, null, null);
    }

    @Test
    void shouldFindByEventType() {
        when(repository.findByEventType(event.getEventType())).thenReturn(
                List.of(event)
        );

        List<Event> actual = service.findByEventType(event.getEventType());

        assertEquals(1, actual.size());
        verify(repository).findByEventType(event.getEventType());
    }

    @Test
    void shouldFindByLocation() {
        when(repository.findByLocation(event.getLocation())).thenReturn(
                List.of(event)
        );

        List<Event> actual = service.findByLocation(event.getLocation());

        assertEquals(1, actual.size());
        verify(repository).findByLocation(event.getLocation());
    }

    @Test
    void shouldFindByBadge() {
        when(repository.findByBadge(event.getBadge())).thenReturn(Optional.of(event));

        Optional<Event> actual = service.findByBadge(event.getBadge());

        assertTrue(actual.isPresent());
        verify(repository).findByBadge(event.getBadge());
    }




}
