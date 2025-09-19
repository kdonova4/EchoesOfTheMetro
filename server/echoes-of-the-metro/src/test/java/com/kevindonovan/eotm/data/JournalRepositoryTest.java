package com.kevindonovan.eotm.data;

import com.kevindonovan.eotm.echoes_of_the_metro.data.AppUserRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.JournalRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.LocationRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.StorylineRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.models.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class JournalRepositoryTest {

    @Autowired
    JournalRepository repository;

    @Autowired
    AppUserRepository appUserRepository;

    @Autowired
    LocationRepository locationRepository;

    @Autowired
    StorylineRepository storylineRepository;

    @Autowired
    KnownGoodState knownGoodState;

    private Location location;
    private AppUser appUser;
    private Storyline storyline;

    @BeforeEach
    void setUp() {
        knownGoodState.set();
        appUser = appUserRepository.findById(1).get();
        location = locationRepository.findById(1).get();
        storyline = storylineRepository.findById(1).get();
    }

    @Test
    void shouldFindByStoryline() {
        List<Journal> journals = repository.findByStoryline(storyline);

        assertEquals(1, journals.size());
    }

    @Test
    void shouldFindByAppUser() {
        List<Journal> journals = repository.findByAppUser(appUser);

        assertEquals(1, journals.size());
    }

    @Test
    void shouldFindByLocation() {
        List<Journal> journals = repository.findByLocation(location);

        assertEquals(1, journals.size());
    }

    @Test
    void shouldFindJournalsByEchoCount() {
        List<Journal> journals = repository.findJournalsByEchoCount(0);

        assertEquals(2, journals.size());
    }

    @Test
    void shouldCreate() {
        Journal journal = new Journal(0, "Found something", "You find something", null, appUser, location, 0, null, CreatedStatus.FRESH, Collections.emptyList());

        repository.save(journal);

        assertEquals(3, repository.findAll().size());
    }

    @Test
    void shouldDeleteById() {
        repository.deleteById(1);

        assertEquals(1, repository.findAll().size());
    }

}
