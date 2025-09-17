package com.kevindonovan.eotm.echoes_of_the_metro.data;

import com.kevindonovan.eotm.echoes_of_the_metro.models.Event;
import com.kevindonovan.eotm.echoes_of_the_metro.models.EventType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Integer> {

    List<Event> findByEventType(EventType eventType);

}
