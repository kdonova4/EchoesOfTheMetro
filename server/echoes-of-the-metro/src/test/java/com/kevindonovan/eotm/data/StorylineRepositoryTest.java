package com.kevindonovan.eotm.data;

import com.kevindonovan.eotm.echoes_of_the_metro.data.AppUserRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.StorylineRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUser;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Storyline;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@SpringBootTest
public class StorylineRepositoryTest {

    @Autowired
    StorylineRepository repository;

    @Autowired
    AppUserRepository appUserRepository;

    @Autowired
    KnownGoodState knownGoodState;

    private AppUser user;
    @BeforeEach
    void setUp() {
        knownGoodState.set();
        user = appUserRepository.findById(1).get();
    }

    @Test
    void shouldFindByStorylineTitle() {
        Optional<Storyline> storyline = repository.findByStorylineTitle("The Fall of the Metro");

        assertTrue(storyline.isPresent());
    }

    @Test
    void shouldFindStorylinesByUser() {
        List<Storyline> storylines = repository.findStorylineByAppUser(user);
        assertEquals(1, storylines.size());
    }

    @Test
    void shouldCreate() {
        Storyline storyline = new Storyline(0, "Test", user, Collections.emptyList());

        repository.save(storyline);

        List<Storyline> storylines = repository.findAll();
        assertEquals(3, storylines.size());
    }

    @Test
    void shouldDeleteById() {
        repository.deleteById(1);

        assertEquals(1, repository.findAll().size());
    }
}
