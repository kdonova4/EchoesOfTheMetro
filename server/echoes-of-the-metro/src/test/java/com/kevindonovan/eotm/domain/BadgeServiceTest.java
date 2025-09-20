package com.kevindonovan.eotm.domain;

import com.kevindonovan.eotm.echoes_of_the_metro.data.BadgeRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.BadgeService;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Badge;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class BadgeServiceTest {

    @Mock
    BadgeRepository repository;

    @InjectMocks
    BadgeService service;

    private Badge badge;

    @BeforeEach
    void setup() {
        badge = new Badge(1, "Return Home", "path");
    }

    @Test
    void shouldFindByBadgeName() {
        when(repository.findByBadgeName(badge.getBadgeName())).thenReturn(Optional.of(badge));

        Optional<Badge> actual = service.findByBadgeName(badge.getBadgeName());
        assertTrue(actual.isPresent());
        verify(repository).findByBadgeName(badge.getBadgeName());
    }

}
