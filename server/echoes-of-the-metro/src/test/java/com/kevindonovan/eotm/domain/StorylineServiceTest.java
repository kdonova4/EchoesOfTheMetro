package com.kevindonovan.eotm.domain;

import com.kevindonovan.eotm.data.KnownGoodState;
import com.kevindonovan.eotm.echoes_of_the_metro.data.AppRoleRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.AppUserRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.StorylineRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.Result;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.ResultType;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.StorylineService;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppRole;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUser;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.StorylineCreate;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.StorylineResponse;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Storyline;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class StorylineServiceTest {

    @Mock
    StorylineRepository repository;

    @Mock
    AppUserRepository appUserRepository;

    @InjectMocks
    StorylineService service;

    private Storyline storyline;
    private AppUser appUser;
    private AppRole appRole;

    @BeforeEach
    void setup() {
        appRole = new AppRole(1, "STALKER");
        appUser = new AppUser(1, "kevin123", "kevin123@gmail.com", "85c*98Kd", 0, 0, 0, appRole, false, Collections.emptyList());
        storyline = new Storyline(1, "Returning to Exhibition", appUser, Collections.emptyList());
    }

    @Test
    void shouldFindByStorylineTitle() {
        when(repository.findByStorylineTitle(storyline.getStorylineTitle())).thenReturn(Optional.of(storyline));

        Optional<Storyline> actual = service.findByStorylineTitle(storyline.getStorylineTitle());
        assertTrue(actual.isPresent());
        verify(repository).findByStorylineTitle(storyline.getStorylineTitle());
    }

    @Test
    void shouldFindStorylinesByAppUser() {
        when(repository.findStorylineByAppUser(appUser)).thenReturn(
                List.of(storyline)
        );

        List<Storyline> actual = service.findStorylineByAppUser(appUser);

        assertEquals(1, actual.size());
        verify(repository).findStorylineByAppUser(appUser);
    }

    @Test
    void shouldCreateValid() {
        Storyline mockOut = new Storyline(1, "Returning to Exhibition", appUser, Collections.emptyList());

        storyline.setStorylineId(0);

        StorylineCreate storylineCreate = new StorylineCreate(storyline.getStorylineTitle(), storyline.getAppUser().getAppUserId());

        when(appUserRepository.findById(appUser.getAppUserId())).thenReturn(Optional.of(appUser));
        when(repository.save(storyline)).thenReturn(mockOut);

        Result<StorylineResponse> actual = service.create(storylineCreate);

        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotCreateInvalid() {

        StorylineCreate storylineCreate = new StorylineCreate(storyline.getStorylineTitle(), storyline.getAppUser().getAppUserId());
        when(appUserRepository.findById(appUser.getAppUserId())).thenReturn(Optional.of(appUser));
        storylineCreate.setStorylineTitle("");
        Result<StorylineResponse> actual = service.create(storylineCreate);
        assertEquals(ResultType.INVALID, actual.getType());

        storyline.setStorylineTitle("Test");
        storylineCreate.setAppUserId(0);

        assertThrows(NoSuchElementException.class, () -> {
            service.create(storylineCreate);
        });
    }

    @Test
    void shouldDeleteById() {
        when(repository.existsById(storyline.getStorylineId())).thenReturn(true);
        doNothing().when(repository).deleteById(storyline.getStorylineId());
        assertTrue(service.deleteById(storyline.getStorylineId()));
        verify(repository).deleteById(storyline.getStorylineId());
    }

    @Test
    void shouldNotDeleteByNotFoundId() {
        when(repository.existsById(999)).thenReturn(false);
        assertFalse(service.deleteById(999));
        verify(repository, never()).deleteById(anyInt());
    }

}
