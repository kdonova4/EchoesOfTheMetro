package com.kevindonovan.eotm.echoes_of_the_metro.domain;

import com.kevindonovan.eotm.echoes_of_the_metro.data.AppUserRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.BadgeRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.EventRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.LocationRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.models.*;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class EventService {

    private final EventRepository repository;
    private final AppUserRepository appUserRepository;
    private final LocationRepository locationRepository;
    private final BadgeRepository badgeRepository;

    public EventService(EventRepository repository, AppUserRepository appUserRepository, LocationRepository locationRepository, BadgeRepository badgeRepository) {
        this.repository = repository;

        this.appUserRepository = appUserRepository;
        this.locationRepository = locationRepository;
        this.badgeRepository = badgeRepository;
    }

    public Optional<Event> findById(int eventId) {
        return repository.findById(eventId);
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

    public Event generateEvent(int locationId, int appUserId) {

        AppUser appUser = appUserRepository.findById(appUserId).orElseThrow(() -> new NoSuchElementException("User not found"));
        Location location = locationRepository.findById(locationId).orElseThrow(() -> new NoSuchElementException("User not found"));

        Set<Badge> badges = appUser.getBadges().stream()
                .map(AppUserBadge::getBadge)
                .collect(Collectors.toSet());

        List<Event> chosenEvents = new ArrayList<>();
        while(chosenEvents.isEmpty()) {
            EventType chosenType = EventType.getRandomType();

            if(chosenType == EventType.LOCATION) {
                // if location has specific events grab those events
                chosenEvents = repository.findByLocation(location).stream()
                        .filter(event -> event.getBadge() == null || !badges.contains(event.getBadge()))
                        .toList();
            } else {
                chosenEvents = repository.findByEventType(chosenType).stream()
                        .filter(event -> event.getBadge() == null || !badges.contains(event.getBadge()))
                        .toList();
            }
        }

        Event chosenEvent = chosenEvents.get(new Random().nextInt(chosenEvents.size()));

        appUser.setFuel(appUser.getFuel() + chosenEvent.getFuelFound());
        appUser.setScrap(appUser.getScrap() + chosenEvent.getScrapFound());
        appUser.setMgr(appUser.getMgr() + chosenEvent.getMgrCollected());

        List<AppUserBadge> appUserBadges = appUser.getBadges();


        if(chosenEvent.getBadge() != null) {
            Badge badge = badgeRepository.findById(chosenEvent.getBadge().getBadgeId()).orElseThrow(() -> new NoSuchElementException("Badge not found"));
            appUserBadges.add(new AppUserBadge(null, appUser, badge, Timestamp.valueOf(LocalDateTime.now())));
            appUser.setBadges(appUserBadges);
        }

        appUserRepository.save(appUser);

        return chosenEvent;
    }
}
