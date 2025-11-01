package com.kevindonovan.eotm.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.kevindonovan.eotm.echoes_of_the_metro.controllers.StorylineController;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.AppUserService;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.Result;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.StorylineService;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.mappers.StoryLineMapper;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppRole;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUser;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.StorylineCreate;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.StorylineResponse;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Storyline;
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

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.mockito.Mockito.when;


@SpringBootTest
@AutoConfigureMockMvc
public class StorylineControllerTest {

    @MockitoBean
    StorylineService service;

    @MockitoBean
    AppUserService appUserService;

    @Autowired
    MockMvc mockMvc;

    @Autowired
    JwtService jwtService;

    private String token;
    private final ObjectMapper jsonMapper = new ObjectMapper();
    private AppUser appUser;
    private AppRole appRole;
    private Storyline storyline;

    @BeforeEach
    void setup() {
        appRole = new AppRole(1, "STALKER");
        appUser = new AppUser(1, "kevin123", "kevin123@gmail.com", "85c*98Kd", 0, 0, 0, appRole, false, Collections.emptyList());
        storyline = new Storyline(1, "Returning to Exhibition", appUser, Collections.emptyList());

        when(appUserService.findByUsername("kevin123")).thenReturn(Optional.of(appUser));
        token = jwtService.getToken(appUser.getUsername());
        jsonMapper.registerModule(new JavaTimeModule());
        jsonMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    }

    @Test
    void shouldFindByIdShouldReturn200() throws Exception {
        StorylineResponse storylineResponse = StoryLineMapper.toResponse(storyline);
        when(service.findById(1)).thenReturn(Optional.of(storyline));

        String storylineJson = jsonMapper.writeValueAsString(storylineResponse);

        var request = get("/api/storylines/1")
                .header("Authorization", "Bearer " + token);

        mockMvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(content().json(storylineJson));
    }

    @Test
    void shouldFindByIdShouldReturn404() throws Exception {
        when(service.findById(1)).thenReturn(Optional.empty());

        var request = get("/api/storylines/1")
                .header("Authorization", "Bearer " + token);

        mockMvc.perform(request)
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldFindByUserShouldReturn200() throws Exception {
        var request = get("/api/storylines/user/1")
                .header("Authorization", "Bearer " + token);

        when(appUserService.findById(any(Integer.class))).thenReturn(Optional.of(appUser));
        when(service.findStorylineByAppUser(any(AppUser.class))).thenReturn(List.of(storyline));

        mockMvc.perform(request)
                .andExpect(status().isOk());
    }

    @Test
    void shouldFindByUserShouldReturn404() throws Exception {
        var request = get("/api/storylines/user/1")
                .header("Authorization", "Bearer " + token);

        when(appUserService.findById(any(Integer.class))).thenReturn(Optional.empty());


        mockMvc.perform(request)
                .andExpect(status().isNotFound());
    }

    @Test
    void createShouldReturn400WhenEmpty() throws Exception {
        var request = post("/api/storylines")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token);

        mockMvc.perform(request)
                .andExpect(status().isBadRequest());
    }

    @Test
    void createShouldReturn400WhenInvalid() throws Exception {
        StorylineResponse storylineResponse = new StorylineResponse();

        String storylineJson = jsonMapper.writeValueAsString(storylineResponse);

        var request = post("/api/storylines")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content(storylineJson);

        mockMvc.perform(request)
                .andExpect(status().isBadRequest());
    }

    @Test
    void createShouldReturn415WhenMultipart() throws Exception {
        StorylineResponse storylineResponse = new StorylineResponse();

        String storylineJson = jsonMapper.writeValueAsString(storylineResponse);

        var request = post("/api/storylines")
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .header("Authorization", "Bearer " + token)
                .content(storylineJson);

        mockMvc.perform(request)
                .andExpect(status().isUnsupportedMediaType());
    }

    @Test
    void createShouldReturn201() throws Exception {
        StorylineCreate storylineCreate = new StorylineCreate(
                storyline.getStorylineTitle(),
                storyline.getAppUser().getAppUserId()
        );
        StorylineResponse expected = StoryLineMapper.toResponse(storyline);

        Result<StorylineResponse> result = new Result<>();
        result.setPayload(expected);
        when(service.create(storylineCreate)).thenReturn(result);

        String storylineJson = jsonMapper.writeValueAsString(storylineCreate);
        String expectedJson = jsonMapper.writeValueAsString(expected);

        var request = post("/api/storylines")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content(storylineJson);

        mockMvc.perform(request)
                .andExpect(status().isCreated())
                .andExpect(content().json(expectedJson));

    }

    @Test
    void deleteShouldReturn204NoContent() throws Exception {

        var request = delete("/api/storylines/1")
                .header("Authorization", "Bearer " + token);


        mockMvc.perform(request)
                .andExpect(status().isNoContent());
    }

}
