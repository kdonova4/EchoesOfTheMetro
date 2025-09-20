package com.kevindonovan.eotm.echoes_of_the_metro.data;

import com.kevindonovan.eotm.echoes_of_the_metro.models.Badge;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Event;
import com.kevindonovan.eotm.echoes_of_the_metro.models.EventType;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {

    List<Event> findByEventType(EventType eventType);

    List<Event> findByLocation(Location location);

    Optional<Event> findByBadge(Badge badge);
}
