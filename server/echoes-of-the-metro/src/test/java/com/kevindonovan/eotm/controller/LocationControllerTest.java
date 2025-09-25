package com.kevindonovan.eotm.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.AppUserService;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.LocationService;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.mappers.LocationMapper;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.mappers.StoryLineMapper;
import com.kevindonovan.eotm.echoes_of_the_metro.models.*;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.LocationResponse;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.StorylineResponse;
import com.kevindonovan.eotm.echoes_of_the_metro.security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class LocationControllerTest {

    @MockitoBean
    LocationService locationService;

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
    private Location location;

    @BeforeEach
    void setup() {
        appRole = new AppRole(1, "STALKER");
        appUser = new AppUser(1, "kevin123", "kevin123@gmail.com", "85c*98Kd", 0, 0, 0, appRole, false, Collections.emptyList());
        location = new Location(1, "Exhibition Station", "Artyom's home station", LocationType.STATION);
        when(appUserService.findByUsername("kevin123")).thenReturn(Optional.of(appUser));
        token = jwtService.getToken(appUser.getUsername());
        jsonMapper.registerModule(new JavaTimeModule());
        jsonMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    }

    @Test
    void shouldFindByIdShouldReturn200() throws Exception {
        LocationResponse locationResponse = LocationMapper.toResponse(location);
        when(locationService.findById(1)).thenReturn(Optional.of(location));

        String locationJson = jsonMapper.writeValueAsString(locationResponse);

        var request = get("/api/locations/1")
                .header("Authorization", "Bearer " + token);

        mockMvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(content().json(locationJson));
    }

    @Test
    void shouldFindByIdShouldReturn404() throws Exception {
        when(locationService.findById(1)).thenReturn(Optional.empty());

        var request = get("/api/locations/1")
                .header("Authorization", "Bearer " + token);

        mockMvc.perform(request)
                .andExpect(status().isNotFound());
    }


}
