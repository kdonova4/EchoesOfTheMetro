package com.kevindonovan.eotm.echoes_of_the_metro.controllers;

import com.kevindonovan.eotm.echoes_of_the_metro.domain.AppUserBadgeService;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.Result;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.AppUserBadgeCreate;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.AppUserBadgeResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "AppUserBadge Controller", description = "Badge Operations")
@RequestMapping("/api/app-user-badge")
public class AppUserBadgeController {

    private final AppUserBadgeService service;

    public AppUserBadgeController(AppUserBadgeService service) {
        this.service = service;
    }

    @PostMapping
    @Operation(summary = "Creates a badge for a specific user")
    public ResponseEntity<Object> create(@RequestBody AppUserBadgeCreate appUserBadgeCreate) {
        Result<AppUserBadgeResponse> result = service.create(appUserBadgeCreate);

        if(!result.isSuccess()) {
            return ErrorResponse.build(result);
        }

        return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
    }
}
