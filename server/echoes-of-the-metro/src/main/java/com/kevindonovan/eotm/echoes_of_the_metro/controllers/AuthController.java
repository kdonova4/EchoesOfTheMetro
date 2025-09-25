package com.kevindonovan.eotm.echoes_of_the_metro.controllers;

import com.kevindonovan.eotm.echoes_of_the_metro.domain.AccountCredentials;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.AppUserService;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.Result;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.mappers.AppUserMapper;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUser;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.AppUserResponse;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.AppUserUpdate;
import com.kevindonovan.eotm.echoes_of_the_metro.security.JwtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.ValidationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@Tag(name = "Auth Controller", description = "Login/Register Operations")
@RequestMapping("/api/users")
public class AuthController {

    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final AppUserService appUserService;

    public AuthController(JwtService jwtService, AuthenticationManager authenticationManager, AppUserService appUserService) {
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.appUserService = appUserService;
    }

    @GetMapping("/{userId}")
    @Operation(summary = "Finds user by ID")
    public ResponseEntity<AppUserResponse> findById(@PathVariable int userId) {
        Optional<AppUser> appUser = appUserService.findById(userId);

        if(appUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(AppUserMapper.toResponse(appUser.get()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AccountCredentials accountCredentials) {
        UsernamePasswordAuthenticationToken creds =
                new UsernamePasswordAuthenticationToken(accountCredentials.username(), accountCredentials.password());

        try {
            Authentication auth = authenticationManager.authenticate(creds);

            String jwts = jwtService.getToken(auth.getName());

            return ResponseEntity.ok()
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwts)
                    .header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization")
                    .build();
        } catch (AuthenticationException ex) {
            // Covers BadCredentialsException and others
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid username or password");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> createAccount(@RequestBody AccountCredentials accountCredentials) {

        AppUser appUser = null;

        try {
            appUser = appUserService.createStalker(accountCredentials);
        } catch (ValidationException ex) {
            return new ResponseEntity<>(List.of(ex.getMessage()), HttpStatus.BAD_REQUEST);
        } catch (DuplicateKeyException ex) {
            return new ResponseEntity<>(List.of("The provided username already exists"), HttpStatus.BAD_REQUEST);
        }

        HashMap<String, Object> map = new HashMap<>();
        map.put("appUserId", appUser.getAppUserId());
        map.put("email", appUser.getEmail());

        return new ResponseEntity<>(map, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Object> update(@RequestBody AppUserUpdate appUserUpdate) {
        Result<AppUserResponse> result = appUserService.updateStalker(appUserUpdate);

        if(!result.isSuccess()) {
            return ErrorResponse.build(result);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }



}
