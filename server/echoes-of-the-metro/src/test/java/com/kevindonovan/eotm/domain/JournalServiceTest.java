package com.kevindonovan.eotm.domain;

import com.kevindonovan.eotm.echoes_of_the_metro.data.AppUserRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.JournalRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.LocationRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.StorylineRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.JournalService;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.Result;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.ResultType;
import com.kevindonovan.eotm.echoes_of_the_metro.models.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.never;

@ExtendWith(MockitoExtension.class)
public class JournalServiceTest {

    @Mock
    JournalRepository repository;

    @Mock
    AppUserRepository appUserRepository;

    @Mock
    LocationRepository locationRepository;

    @Mock
    StorylineRepository storylineRepository;

    @InjectMocks
    JournalService service;

    private Location location;
    private AppUser appUser;
    private Journal journal;
    private Storyline storyline;
    private AppRole appRole;

    @BeforeEach
    void setup() {
        appRole = new AppRole(1, "STALKER");
        appUser = new AppUser(1, "kevin123", "kevin123@gmail.com", "85c*98Kd", 0, 0, 0, appRole, false, Collections.emptyList());
        storyline = new Storyline(1, "Returning to Exhibition", appUser, Collections.emptyList());
        location = new Location(1, "Exhibition Station", "Artyom's home station", LocationType.STATION);
        journal = new Journal(1, "Found something", "You find something", storyline, appUser, location, 0, null, CreatedStatus.FRESH, Collections.emptyList());
    }

    @Test
    void shouldFindByStoryline() {
        when(repository.findByStoryline(storyline)).thenReturn(
                List.of(journal)
        );

        List<Journal> actual = service.findByStoryline(storyline);

        assertEquals(1, actual.size());
        verify(repository).findByStoryline(storyline);
    }

    @Test
    void shouldFindByAppUser() {
        when(repository.findByAppUser(appUser)).thenReturn(
                List.of(journal)
        );

        List<Journal> actual = service.findByAppUser(appUser);

        assertEquals(1, actual.size());
        verify(repository).findByAppUser(appUser);
    }

    @Test
    void shouldFindByLocation() {
        when(repository.findByLocation(location)).thenReturn(
                List.of(journal)
        );

        List<Journal> actual = service.findByLocation(location);

        assertEquals(1, actual.size());
        verify(repository).findByLocation(location);
    }

    @Test
    void shouldFindByEchoCount() {
        when(repository.findJournalsByEchoCount(0)).thenReturn(
                List.of(journal)
        );

        List<Journal> actual = service.findByEchoCount(0);

        assertEquals(1, actual.size());
        verify(repository).findJournalsByEchoCount(0);
    }

    @Test
    void shouldCreateValid() {
        Journal mockOut = new Journal(1, "Found something", "You find something", storyline, appUser, location, 0, null, CreatedStatus.FRESH, Collections.emptyList());

        mockOut.setCreatedAt(Timestamp.valueOf(LocalDateTime.now()));
        journal.setJournalId(0);

        when(appUserRepository.findById(appUser.getAppUserId())).thenReturn(Optional.of(appUser));
        when(locationRepository.findById(location.getLocationId())).thenReturn(Optional.of(location));
        when(storylineRepository.findById(storyline.getStorylineId())).thenReturn(Optional.of(storyline));

        when(repository.save(journal)).thenReturn(mockOut);

        Result<Journal> actual = service.create(journal);

        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotCreateInvalid() {
        Result<Journal> actual = service.create(journal);
        assertEquals(ResultType.INVALID, actual.getType());

        journal.setJournalId(0);
        journal.setTitle("");
        actual = service.create(journal);
        assertEquals(ResultType.INVALID, actual.getType());

        journal.setTitle("Test");
        journal.setText("");
        actual = service.create(journal);
        assertEquals(ResultType.INVALID, actual.getType());

        journal.setText("Test Text");
        journal.setCreatedStatus(null);
        actual = service.create(journal);
        assertEquals(ResultType.INVALID, actual.getType());

        journal.setCreatedStatus(CreatedStatus.FRESH);
        journal.setLocation(null);
        actual = service.create(journal);
        assertEquals(ResultType.INVALID, actual.getType());

        journal.setLocation(location);
        journal.setAppUser(null);
        actual = service.create(journal);
        assertEquals(ResultType.INVALID, actual.getType());

        journal.setAppUser(appUser);
        storyline = null;
        actual = service.create(journal);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldDeleteById() {
        when(repository.existsById(journal.getJournalId())).thenReturn(true);
        doNothing().when(repository).deleteById(journal.getJournalId());
        assertTrue(service.deleteById(journal.getJournalId()));
        verify(repository).deleteById(journal.getJournalId());
    }

    @Test
    void shouldNotDeleteByNotFoundId() {
        when(repository.existsById(999)).thenReturn(false);
        assertFalse(service.deleteById(999));
        verify(repository, never()).deleteById(anyInt());
    }

}
