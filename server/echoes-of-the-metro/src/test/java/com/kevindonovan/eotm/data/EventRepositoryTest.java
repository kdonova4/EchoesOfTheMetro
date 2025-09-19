package com.kevindonovan.eotm.data;

import com.kevindonovan.eotm.echoes_of_the_metro.data.EventRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Event;
import com.kevindonovan.eotm.echoes_of_the_metro.models.EventType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class EventRepositoryTest {

    @Autowired
    EventRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setUp() {
        knownGoodState.set();
    }

    @Test
    void shouldFindByEventType() {
        List<Event> events = repository.findByEventType(EventType.ANOMALY);

        assertEquals(1, events.size());
    }
}
