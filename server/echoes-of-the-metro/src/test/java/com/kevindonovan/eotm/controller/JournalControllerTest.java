package com.kevindonovan.eotm.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.*;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.mappers.JournalMapper;
import com.kevindonovan.eotm.echoes_of_the_metro.models.*;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.JournalCreate;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.JournalResponse;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.StorylineResponse;
import com.kevindonovan.eotm.echoes_of_the_metro.security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class JournalControllerTest {

    @MockitoBean
    JournalService journalService;

    @MockitoBean
    AppUserService appUserService;

    @MockitoBean
    StorylineService storylineService;

    @MockitoBean
    LocationService locationService;

    @Autowired
    MockMvc mockMvc;

    @Autowired
    JwtService jwtService;

    private String token;
    private final ObjectMapper jsonMapper = new ObjectMapper();
    private AppUser appUser;
    private AppRole appRole;
    private Storyline storyline;
    private Journal journal;
    private Location location;

    @BeforeEach
    void setup() {
        appRole = new AppRole(1, "STALKER");
        appUser = new AppUser(1, "kevin123", "kevin123@gmail.com", "85c*98Kd", 0, 0, 0, appRole, false, Collections.emptyList());
        storyline = new Storyline(1, "Returning to Exhibition", appUser, Collections.emptyList());
        location = new Location(1, "Exhibition Station", "Artyom's home station", LocationType.STATION);
        journal = new Journal(1, "Found something", "You find something", storyline, appUser, location, 0, null, null, Collections.emptyList());

        when(appUserService.findByUsername("kevin123")).thenReturn(Optional.of(appUser));
        token = jwtService.getToken(appUser.getUsername());
        jsonMapper.registerModule(new JavaTimeModule());
        jsonMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    }

    @Test
    void shouldFindByStorylineShouldReturn404() throws Exception {
        when(storylineService.findById(anyInt())).thenReturn(Optional.empty());


        var request = get("/api/journals/storyline/1")
                .header("Authorization", "Bearer " + token);

        mockMvc.perform(request)
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldFindByStorylineShouldReturn200() throws Exception {
        when(storylineService.findById(anyInt())).thenReturn(Optional.of(storyline));
        when(journalService.findByStoryline(any(Storyline.class))).thenReturn(List.of(journal));


        var request = get("/api/journals/storyline/1")
                .header("Authorization", "Bearer " + token);

        mockMvc.perform(request)
                .andExpect(status().isOk());
    }

    @Test
    void shouldFindByUserShouldReturn404() throws Exception {
        when(appUserService.findById(anyInt())).thenReturn(Optional.empty());


        var request = get("/api/journals/user/1")
                .header("Authorization", "Bearer " + token);

        mockMvc.perform(request)
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldFindByUserShouldReturn200() throws Exception {
        when(appUserService.findById(anyInt())).thenReturn(Optional.of(appUser));
        when(journalService.findByAppUser(any(AppUser.class))).thenReturn(List.of(journal));


        var request = get("/api/journals/user/1")
                .header("Authorization", "Bearer " + token);

        mockMvc.perform(request)
                .andExpect(status().isOk());
    }

    @Test
    void shouldFindByLocationShouldReturn404() throws Exception {
        when(locationService.findById(anyInt())).thenReturn(Optional.empty());


        var request = get("/api/journals/location/1")
                .header("Authorization", "Bearer " + token);

        mockMvc.perform(request)
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldFindByLocationShouldReturn200() throws Exception {
        when(locationService.findById(anyInt())).thenReturn(Optional.of(location));
        when(journalService.findByLocation(any(Location.class))).thenReturn(List.of(journal));


        var request = get("/api/journals/location/1")
                .header("Authorization", "Bearer " + token);

        mockMvc.perform(request)
                .andExpect(status().isOk());
    }

    @Test
    void findByEchoesShouldReturn200() throws Exception {
        when(journalService.findByEchoCount(anyLong())).thenReturn(List.of(journal));

        var request = get("/api/journals/echoes/1")
                .header("Authorization", "Bearer " + token);

        mockMvc.perform(request)
                .andExpect(status().isOk());
    }

    @Test
    void createShouldReturn400WhenEmpty() throws Exception {
        var request = post("/api/journals")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token);

        mockMvc.perform(request)
                .andExpect(status().isBadRequest());
    }

    @Test
    void createShouldReturn400WhenInvalid() throws Exception {
        JournalResponse journalResponse = new JournalResponse();

        String journalJson = jsonMapper.writeValueAsString(journalResponse);

        var request = post("/api/journals")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content(journalJson);

        mockMvc.perform(request)
                .andExpect(status().isBadRequest());
    }

    @Test
    void createShouldReturn415WhenMultipart() throws Exception {
        JournalResponse journalResponse = new JournalResponse();

        String journalJson = jsonMapper.writeValueAsString(journalResponse);

        var request = post("/api/journals")
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .header("Authorization", "Bearer " + token)
                .content(journalJson);

        mockMvc.perform(request)
                .andExpect(status().isUnsupportedMediaType());
    }

    @Test
    void createShouldReturn201() throws Exception {
        JournalCreate journalCreate = new JournalCreate(
                journal.getTitle(),
                journal.getText(),
                journal.getStoryline().getStorylineId(),
                journal.getAppUser().getAppUserId(),
                journal.getLocation().getLocationId()
        );

        JournalResponse expected = JournalMapper.toResponse(journal);

        Result<JournalResponse> result = new Result<>();
        result.setPayload(expected);
        when(journalService.create(journalCreate)).thenReturn(result);

        String journalJson = jsonMapper.writeValueAsString(journalCreate);
        String expectedJson = jsonMapper.writeValueAsString(expected);

        var request = post("/api/journals")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content(journalJson);

        mockMvc.perform(request)
                .andExpect(status().isCreated())
                .andExpect(content().json(expectedJson));
    }

    @Test
    void deleteShouldReturn204NoContent() throws Exception {

        var request = delete("/api/journals/1")
                .header("Authorization", "Bearer " + token);


        mockMvc.perform(request)
                .andExpect(status().isNoContent());
    }
}
