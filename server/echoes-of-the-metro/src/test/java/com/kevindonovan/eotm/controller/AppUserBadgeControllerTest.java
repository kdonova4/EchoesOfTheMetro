package com.kevindonovan.eotm.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.AppUserBadgeService;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.AppUserService;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.Result;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.mappers.AppUserBadgeMapper;
import com.kevindonovan.eotm.echoes_of_the_metro.models.*;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.AppUserBadgeCreate;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.AppUserBadgeResponse;
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

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AppUserBadgeControllerTest {

    @MockitoBean
    AppUserBadgeService appUserBadgeService;

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
    private AppUserBadge appUserBadge;
    private Badge badge;

    @BeforeEach
    void setup() {
        appRole = new AppRole(1, "STALKER");
        appUser = new AppUser(1, "kevin123", "kevin123@gmail.com", "85c*98Kd", 0, 0, 0, appRole, false, Collections.emptyList());
        badge = new Badge(1, "First steps", "path");
        AppUserBadgeKey key = new AppUserBadgeKey(appUser.getAppUserId(), badge.getBadgeId());
        appUserBadge = new AppUserBadge(key, appUser, badge, null);


        when(appUserService.findByUsername("kevin123")).thenReturn(Optional.of(appUser));
        token = jwtService.getToken(appUser.getUsername());
        jsonMapper.registerModule(new JavaTimeModule());
        jsonMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    }

    @Test
    void createShouldReturn400WhenEmpty() throws Exception {
        var request = post("/api/app-user-badge")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token);

        mockMvc.perform(request)
                .andExpect(status().isBadRequest());
    }

    @Test
    void createShouldReturn400WhenInvalid() throws Exception {
        AppUserBadgeResponse appUserBadgeResponse = new AppUserBadgeResponse();

        String appUserBadgeJson = jsonMapper.writeValueAsString(appUserBadgeResponse);

        var request = post("/api/app-user-badge")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content(appUserBadgeJson);

        mockMvc.perform(request)
                .andExpect(status().isBadRequest());
    }

    @Test
    void createShouldReturn415WhenMultipart() throws Exception {
        AppUserBadgeResponse appUserBadgeResponse = new AppUserBadgeResponse();

        String appUserBadgeJson = jsonMapper.writeValueAsString(appUserBadgeResponse);

        var request = post("/api/app-user-badge")
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .header("Authorization", "Bearer " + token)
                .content(appUserBadgeJson);

        mockMvc.perform(request)
                .andExpect(status().isUnsupportedMediaType());
    }

    @Test
    void createShouldReturn201() throws Exception {
        AppUserBadgeCreate appUserBadgeCreate = new AppUserBadgeCreate(
                appUser.getAppUserId(), badge.getBadgeId()
        );
        AppUserBadgeResponse expected = AppUserBadgeMapper.toResponse(appUserBadge);

        Result<AppUserBadgeResponse> result = new Result<>();
        result.setPayload(expected);
        when(appUserBadgeService.create(appUserBadgeCreate)).thenReturn(result);

        String appUserBadgeJson = jsonMapper.writeValueAsString(appUserBadgeCreate);
        String expectedJson = jsonMapper.writeValueAsString(expected);

        var request = post("/api/app-user-badge")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content(appUserBadgeJson);

        mockMvc.perform(request)
                .andExpect(status().isCreated())
                .andExpect(content().json(expectedJson));

    }
}
