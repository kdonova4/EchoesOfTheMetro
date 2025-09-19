package com.kevindonovan.eotm.data;

import com.kevindonovan.eotm.echoes_of_the_metro.data.AppUserRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.EchoRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.JournalRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUser;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Echo;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Journal;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class EchoRepositoryTest {

    @Autowired
    EchoRepository repository;

    @Autowired
    JournalRepository journalRepository;

    @Autowired
    AppUserRepository appUserRepository;

    @Autowired
    KnownGoodState knownGoodState;

    private AppUser appUser;
    private Journal journal;

    @BeforeEach
    void setUp() {
        knownGoodState.set();
        appUser = appUserRepository.findById(2).get();
        journal = journalRepository.findById(1).get();
    }

    @Test
    void shouldFindByJournalAndAppUser() {

        Optional<Echo> echo = repository.findByJournalAndAppUser(journal, appUser);

        assertTrue(echo.isPresent());
    }

    @Test
    void shouldCountByJournal() {
        long count = repository.countByJournal(journal);

        assertEquals(1, count);
    }

    @Test
    void shouldCreate() {
        appUser = appUserRepository.findById(3).get();
        Echo echo = new Echo(0, journal, appUser);
        repository.save(echo);

        assertEquals(3, repository.findAll().size());
    }

    @Test
    void shouldDeleteById() {
        repository.deleteById(1);

        assertEquals(1, repository.findAll().size());
    }
}
