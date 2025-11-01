package com.kevindonovan.eotm.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.AccountCredentials;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.AppUserService;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.Result;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.ResultType;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppRole;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUser;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.AppUserResponse;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.AppUserUpdate;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Storyline;
import com.kevindonovan.eotm.echoes_of_the_metro.security.JwtService;
import jakarta.validation.ValidationException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.Optional;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerTest {

    @MockitoBean
    AppUserService appUserService;

    @MockitoBean
    JwtService jwtService;

    @MockitoBean
    AuthenticationManager authenticationManager;

    @Autowired
    MockMvc mockMvc;


    private final ObjectMapper jsonMapper = new ObjectMapper();
    private AppUser appUser;
    private AccountCredentials credentials;
    private AppRole appRole;

    @BeforeEach
    void setup() {
        appRole = new AppRole(1, "STALKER");
        appUser = new AppUser(1, "kevin123", "kevin123@gmail.com", "85c*98Kd", 0, 0, 0, appRole, false, Collections.emptyList());
        credentials = new AccountCredentials("kevin123@gmail.com", "kevin123", "85c*98Kd");
    }

    @Test
    void loginShouldReturnTokenWhenCredentialsAreValid() throws Exception {
        String token = "fake-jwt-token";

        AccountCredentials credentials = new AccountCredentials("kevin123@gmail.com", "kevin123", "85c*98Kd");
        String json = jsonMapper.writeValueAsString(credentials);


        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn(credentials.username());
        when(authenticationManager.authenticate(any(Authentication.class))).thenReturn(authentication);
        when(jwtService.getToken(credentials.username())).thenReturn(token);

        mockMvc.perform(post("/api/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(header().string(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(header().string(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization"));
    }

    @Test
    void loginShouldReturn401WhenCredentialsAreInvalid() throws Exception {
        AccountCredentials credentials = new AccountCredentials("wrong@email.com", "wrongUser", "wrongPass");
        String json = jsonMapper.writeValueAsString(credentials);


        when(authenticationManager.authenticate(any(Authentication.class)))
                .thenThrow(new BadCredentialsException("Bad credentials"));

        mockMvc.perform(post("/api/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string("Invalid username or password"));
    }

    @Test
    void registerShouldReturn201WhenSuccessful() throws Exception {

        when(appUserService.createStalker(any(AccountCredentials.class))).thenReturn(appUser);


        mockMvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonMapper.writeValueAsString(credentials)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.appUserId").value(appUser.getAppUserId()))
                .andExpect(jsonPath("$.email").value(appUser.getEmail()));
    }

    @Test
    void registerShouldReturn400WhenValidationFails() throws Exception {

        when(appUserService.createStalker(any(AccountCredentials.class)))
                .thenThrow(new ValidationException("Email appears to be invalid"));


        mockMvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonMapper.writeValueAsString(credentials)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string(containsString("Email appears to be invalid")));
    }

    @Test
    void updateShouldReturn204WhenSuccessful() throws Exception {

        when(appUserService.findByUsername("kevin123")).thenReturn(Optional.of(appUser));
        String token = jwtService.getToken(appUser.getUsername());


        AppUserUpdate update = new AppUserUpdate(1, 10, 5, 20);

        Result<AppUserResponse> success = new Result<>();
        success.setPayload(new AppUserResponse()); // dummy payload


        when(appUserService.updateStalker(any(AppUserUpdate.class))).thenReturn(success);


        mockMvc.perform(put("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + token)
                        .content(jsonMapper.writeValueAsString(update)))
                .andExpect(status().isNoContent());
    }

    @Test
    void updateShouldReturn400WhenValidationFails() throws Exception {
        when(appUserService.findByUsername("kevin123")).thenReturn(Optional.of(appUser));
        String token = jwtService.getToken(appUser.getUsername());


        AppUserUpdate update = new AppUserUpdate(1, -1, -5, -10); // invalid values

        Result<AppUserResponse> fail = new Result<>();
        fail.addMessages("mgr, scrap, and fuel must be non-negative", ResultType.INVALID);

        when(appUserService.updateStalker(any(AppUserUpdate.class))).thenReturn(fail);


        mockMvc.perform(put("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + token)
                        .content(jsonMapper.writeValueAsString(update)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string(containsString("mgr, scrap, and fuel must be non-negative")));
    }



}
