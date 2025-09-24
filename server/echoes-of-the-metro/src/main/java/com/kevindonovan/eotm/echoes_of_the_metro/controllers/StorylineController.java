package com.kevindonovan.eotm.echoes_of_the_metro.controllers;

import com.kevindonovan.eotm.echoes_of_the_metro.domain.AppUserService;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.Result;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.StorylineService;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.mappers.StoryLineMapper;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUser;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.StorylineCreate;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.StorylineResponse;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Storyline;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@Tag(name = "Storyline Controller", description = "Storyline Operations")
@RequestMapping("/api/storylines")
public class StorylineController {

    private final StorylineService service;
    private final AppUserService appUserService;

    public StorylineController(StorylineService service, AppUserService appUserService) {
        this.service = service;
        this.appUserService = appUserService;
    }

    @GetMapping("/{storylineId}")
    public ResponseEntity<StorylineResponse> findById(@PathVariable int storylineId) {
        Optional<Storyline> storyline = service.findById(storylineId);

        if(storyline.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(StoryLineMapper.toResponse(storyline.get()));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<StorylineResponse>> findByUser(@PathVariable int userId) {
        Optional<AppUser> appUser = appUserService.findById(userId);

        if(appUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<Storyline> storylines = service.findStorylineByAppUser(appUser.get());

        return ResponseEntity.ok(storylines.stream().map(StoryLineMapper::toResponse).toList());
    }

    @PostMapping
    @Operation(summary = "Creates a storyline")
    public ResponseEntity<Object> create(@RequestBody StorylineCreate storylineCreate) {
        Result<StorylineResponse> result = service.create(storylineCreate);

        if(!result.isSuccess()) {
            return ErrorResponse.build(result);
        }

        return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
    }

    @DeleteMapping("/{storylineId}")
    @Operation(summary = "Deletes a storyline")
    public ResponseEntity<Object> deleteById(@PathVariable int storylineId) {
        service.deleteById(storylineId);
        return ResponseEntity.noContent().build();
    }
}
