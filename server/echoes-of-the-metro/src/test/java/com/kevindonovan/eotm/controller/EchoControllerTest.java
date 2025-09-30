package com.kevindonovan.eotm.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.AppUserService;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.EchoService;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.JournalService;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.Result;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.mappers.EchoMapper;
import com.kevindonovan.eotm.echoes_of_the_metro.models.*;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.EchoCreate;
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
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class EchoControllerTest {

    @MockitoBean
    EchoService echoService;

    @MockitoBean
    JournalService journalService;

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
    private Echo echo;
    private Journal journal;

    @BeforeEach
    void setup() {
        appRole = new AppRole(1, "STALKER");
        appUser = new AppUser(1, "kevin123", "kevin123@gmail.com", "85c*98Kd", 0, 0, 0, appRole, false, Collections.emptyList());
        journal = new Journal(1, "Found something", "You find something", null, appUser, null, 0, null, CreatedStatus.FRESH, Collections.emptyList());
        echo = new Echo(1, journal, appUser);

        
        when(appUserService.findByUsername("kevin123")).thenReturn(Optional.of(appUser));
        token = jwtService.getToken(appUser.getUsername());
        jsonMapper.registerModule(new JavaTimeModule());
        jsonMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    }

    @Test
    void countByJournalShouldReturn404() throws Exception {
        when(journalService.findById(anyInt())).thenReturn(Optional.empty());

        var request = get("/api/echoes/journal/1")
                .header("Authorization", "Bearer " + token);

        mockMvc.perform(request)
                .andExpect(status().isNotFound());
    }

    @Test
    void countByJournalShouldReturn200() throws Exception {
        when(journalService.findById(anyInt())).thenReturn(Optional.of(journal));
        when(echoService.countByJournal(any(Journal.class))).thenReturn(Long.valueOf(1));
        String expectedJson = jsonMapper.writeValueAsString(Long.valueOf(1));

        var request = get("/api/echoes/journal/1")
                .header("Authorization", "Bearer " + token);

        mockMvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(content().json(expectedJson));
    }

    @Test
    void createShouldReturn400WhenEmpty() throws Exception {
        var request = post("/api/echoes")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token);

        mockMvc.perform(request)
                .andExpect(status().isBadRequest());
    }

    @Test
    void createShouldReturn400WhenInvalid() throws Exception {
        Echo empty = new Echo();

        String echoJson = jsonMapper.writeValueAsString(empty);

        var request = post("/api/echoes")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content(echoJson);

        mockMvc.perform(request)
                .andExpect(status().isBadRequest());
    }

    @Test
    void createShouldReturn415WhenMultipart() throws Exception {
        Echo empty = new Echo();

        String echoJson = jsonMapper.writeValueAsString(empty);

        var request = post("/api/echoes")
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .header("Authorization", "Bearer " + token)
                .content(echoJson);

        mockMvc.perform(request)
                .andExpect(status().isUnsupportedMediaType());
    }

    @Test
    void createShouldReturn201() throws Exception {
        EchoCreate echoCreate = new EchoCreate(
                journal.getJournalId(),
                appUser.getAppUserId()
        );

        Result<Echo> result = new Result<>();
        result.setPayload(echo);
        when(echoService.create(echoCreate)).thenReturn(result);

        String echoJson = jsonMapper.writeValueAsString(echoCreate);
        String expectedJson = jsonMapper.writeValueAsString(EchoMapper.toResponse(echo));

        var request = post("/api/echoes")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content(echoJson);

        mockMvc.perform(request)
                .andExpect(status().isCreated())
                .andExpect(content().json(expectedJson));
    }

    @Test
    void deleteShouldReturn204NoContent() throws Exception {

        var request = delete("/api/echoes/1")
                .header("Authorization", "Bearer " + token);


        mockMvc.perform(request)
                .andExpect(status().isNoContent());
    }

}
