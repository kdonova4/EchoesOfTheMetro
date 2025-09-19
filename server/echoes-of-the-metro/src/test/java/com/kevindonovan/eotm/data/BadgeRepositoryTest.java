package com.kevindonovan.eotm.data;

import com.kevindonovan.eotm.echoes_of_the_metro.data.BadgeRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Badge;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class BadgeRepositoryTest {

    @Autowired
    BadgeRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setUp() {
        knownGoodState.set();
    }

    @Test
    void shouldFindBadgeName() {
        Optional<Badge> badge = repository.findByBadgeName("First Steps");

        assertTrue(badge.isPresent());
    }
}
