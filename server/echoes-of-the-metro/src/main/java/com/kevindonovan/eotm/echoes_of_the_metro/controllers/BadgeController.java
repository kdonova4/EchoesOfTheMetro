package com.kevindonovan.eotm.echoes_of_the_metro.controllers;

import com.kevindonovan.eotm.echoes_of_the_metro.domain.BadgeService;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.mappers.BadgeMapper;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Badge;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.BadgeResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@Tag(name = "Badge Controller", description = "Badge Operations")
@RequestMapping("/api/badges")
public class BadgeController {

    private final BadgeService service;

    public BadgeController(BadgeService service) {
        this.service = service;
    }

    @GetMapping("/{badgeId}")
    @Operation(summary = "Finds badge by ID")
    public ResponseEntity<BadgeResponse> findById(@PathVariable int badgeId) {
        Optional<Badge> badge = service.findById(badgeId);

        if(badge.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(BadgeMapper.toResponse(badge.get()));
    }


}
