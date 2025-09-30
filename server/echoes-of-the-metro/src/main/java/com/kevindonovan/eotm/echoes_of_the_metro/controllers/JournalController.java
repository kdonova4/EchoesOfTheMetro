package com.kevindonovan.eotm.echoes_of_the_metro.controllers;

import com.kevindonovan.eotm.echoes_of_the_metro.domain.*;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.mappers.JournalMapper;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.mappers.StoryLineMapper;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUser;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.JournalCreate;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.JournalResponse;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.StorylineResponse;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Journal;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Location;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Storyline;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@Tag(name = "Journal Controller", description = "Journal Operations")
@RequestMapping("/api/journals")
public class JournalController {

    private final JournalService service;
    private final AppUserService appUserService;
    private final StorylineService storylineService;
    private final LocationService locationService;

    public JournalController(JournalService service, AppUserService appUserService, StorylineService storylineService, LocationService locationService) {
        this.service = service;
        this.appUserService = appUserService;
        this.storylineService = storylineService;
        this.locationService = locationService;
    }

    @GetMapping("/{journalId}")
    public ResponseEntity<JournalResponse> findById(@PathVariable int journalId) {
        Optional<Journal> journal = service.findById(journalId);

        if(journal.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(JournalMapper.toResponse(journal.get()));
    }

    @GetMapping("/storyline/{storylineId}")
    @Operation(summary = "Finds journals for storyline")
    public ResponseEntity<List<JournalResponse>> findByStoryline(@PathVariable int storylineId) {
        Optional<Storyline> storyline = storylineService.findById(storylineId);

        if(storyline.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<Journal> journals = service.findByStoryline(storyline.get());

        return ResponseEntity.ok(journals.stream().map(JournalMapper::toResponse).toList());
    }

    @GetMapping("/user/{userId}")
    @Operation(summary = "Finds journals for user")
    public ResponseEntity<List<JournalResponse>> findByUser(@PathVariable int userId) {
        Optional<AppUser> appUser = appUserService.findById(userId);

        if(appUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<Journal> journals = service.findByAppUser(appUser.get());

        return ResponseEntity.ok(journals.stream().map(JournalMapper::toResponse).toList());
    }

    @GetMapping("/location/{locationId}")
    @Operation(summary = "Finds journals for location")
    public ResponseEntity<List<JournalResponse>> findByLocation(@PathVariable int locationId) {
        Optional<Location> location = locationService.findById(locationId);

        if(location.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<Journal> journals = service.findByLocation(location.get());

        return ResponseEntity.ok(journals.stream().map(JournalMapper::toResponse).toList());
    }

    @GetMapping("/echoes/{minCount}")
    @Operation(summary = "Find journals by minCount of echoes")
    public ResponseEntity<List<JournalResponse>> findByEchoes(@PathVariable long minCount) {
        List<Journal> journals = service.findByEchoCount(minCount);

        return ResponseEntity.ok(journals.stream().map(JournalMapper::toResponse).toList());
    }

    @PostMapping
    @Operation(summary = "Create journal")
    public ResponseEntity<Object> create(@RequestBody JournalCreate journalCreate) {
        Result<JournalResponse> result = service.create(journalCreate);

        if(!result.isSuccess()) {
            return ErrorResponse.build(result);
        }

        return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
    }

    @DeleteMapping("/{journalId}")
    @Operation(summary = "Deletes a journal")
    public ResponseEntity<Object> deleteById(@PathVariable int journalId) {
        service.deleteById(journalId);
        return ResponseEntity.noContent().build();
    }

}
