package com.kevindonovan.eotm.echoes_of_the_metro.domain;

import com.kevindonovan.eotm.echoes_of_the_metro.data.BadgeRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.EventRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.LocationRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Badge;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Event;
import com.kevindonovan.eotm.echoes_of_the_metro.models.EventType;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Location;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    private final EventRepository repository;
    private final LocationRepository locationRepository;
    private final BadgeRepository badgeRepository;

    public EventService(EventRepository repository, LocationRepository locationRepository, BadgeRepository badgeRepository) {
        this.repository = repository;
        this.locationRepository = locationRepository;
        this.badgeRepository = badgeRepository;
    }

    public List<Event> findByEventType(EventType eventType) {
        return repository.findByEventType(eventType);
    }

    public List<Event> findByLocation(Location location) {
        return repository.findByLocation(location);
    }

    public Optional<Event> findByBadge(Badge badge) {
        return repository.findByBadge(badge);
    }

}
