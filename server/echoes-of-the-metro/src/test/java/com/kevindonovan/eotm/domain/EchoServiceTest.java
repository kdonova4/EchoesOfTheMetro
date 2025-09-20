package com.kevindonovan.eotm.domain;

import com.kevindonovan.eotm.echoes_of_the_metro.data.AppUserRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.EchoRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.JournalRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.EchoService;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.Result;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.ResultType;
import com.kevindonovan.eotm.echoes_of_the_metro.models.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.never;

@ExtendWith(MockitoExtension.class)
public class EchoServiceTest {

    @Mock
    EchoRepository repository;

    @Mock
    AppUserRepository appUserRepository;

    @Mock
    JournalRepository journalRepository;

    @InjectMocks
    EchoService service;

    private Echo echo;
    private AppUser appUser;
    private Journal journal;


    @BeforeEach
    void setup() {
        AppRole appRole = new AppRole(1, "STALKER");
        appUser = new AppUser(1, "kevin123", "kevin123@gmail.com", "85c*98Kd", 0, 0, 0, appRole, false, Collections.emptyList());
        Location location = new Location(1, "Exhibition Station", "Artyom's home station", LocationType.STATION);
        journal = new Journal(1, "Found something", "You find something", null, appUser, location, 0, null, CreatedStatus.FRESH, Collections.emptyList());
        echo = new Echo(1, journal, appUser);
    }

    @Test
    void shouldFindByJournalAndAppUser() {
        when(repository.findByJournalAndAppUser(echo.getJournal(), echo.getAppUser())).thenReturn(Optional.of(echo));

        Optional<Echo> actual = service.findByJournalAndAppUser(echo.getJournal(), echo.getAppUser());

        assertTrue(actual.isPresent());
        verify(repository).findByJournalAndAppUser(echo.getJournal(), echo.getAppUser());
    }

    @Test
    void shouldCountByJournal() {
        when(repository.countByJournal(journal)).thenReturn(Long.valueOf(1));

        long actual = service.countByJournal(journal);

        assertEquals(1, actual);
        verify(repository).countByJournal(journal);
    }

    @Test
    void shouldCreateValid() {
        Echo mockOut = new Echo(1, journal, appUser);

        echo.setEchoId(0);

        when(appUserRepository.findById(echo.getAppUser().getAppUserId())).thenReturn(Optional.of(appUser));
        when(journalRepository.findById(echo.getJournal().getJournalId())).thenReturn(Optional.of(journal));
        when(repository.save(echo)).thenReturn(mockOut);

        Result<Echo> actual = service.create(echo);

        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotCreateInvalid() {
        Result<Echo> actual = service.create(echo);
        assertEquals(ResultType.INVALID, actual.getType());

        echo.setEchoId(0);
        echo.setAppUser(null);
        actual = service.create(echo);
        assertEquals(ResultType.INVALID, actual.getType());

        echo.setAppUser(appUser);
        echo.setJournal(null);
        actual = service.create(echo);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldDeleteById() {
        when(repository.existsById(echo.getEchoId())).thenReturn(true);
        doNothing().when(repository).deleteById(echo.getEchoId());
        assertTrue(service.deleteById(echo.getEchoId()));
        verify(repository).deleteById(echo.getEchoId());
    }

    @Test
    void shouldNotDeleteByNotFoundId() {
        when(repository.existsById(999)).thenReturn(false);
        assertFalse(service.deleteById(999));
        verify(repository, never()).deleteById(anyInt());
    }
}

