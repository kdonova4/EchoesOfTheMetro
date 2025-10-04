package com.kevindonovan.eotm.echoes_of_the_metro.controllers;

import com.kevindonovan.eotm.echoes_of_the_metro.domain.AppUserService;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.EchoService;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.JournalService;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.Result;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.mappers.EchoMapper;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUser;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.EchoCreate;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.EchoResponse;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Echo;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Journal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@Tag(name = "Echo Controller", description = "Echo Operations")
@RequestMapping("/api/echoes")
public class EchoController {

    private final EchoService service;
    private final JournalService journalService;
    private final AppUserService appUserService;

    public EchoController(EchoService service, JournalService journalService, AppUserService appUserService) {
        this.service = service;
        this.journalService = journalService;
        this.appUserService = appUserService;
    }

    @GetMapping("/{echoId}")
    public ResponseEntity<EchoResponse> findById(@PathVariable int echoId) {
        Optional<Echo> echo = service.findById(echoId);

        if(echo.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(EchoMapper.toResponse(echo.get()));
    }

    @GetMapping("/journal/{journalId}/user/{userId}")
    public ResponseEntity<EchoResponse> findByJournalAndAppUser(@PathVariable int journalId, @PathVariable int userId) {
        Optional<Journal> journal = journalService.findById(journalId);
        Optional<AppUser> appUser = appUserService.findById(userId);

        if(journal.isEmpty() || appUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Optional<Echo> echo = service.findByJournalAndAppUser(journal.get(), appUser.get());

        if(echo.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(EchoMapper.toResponse(echo.get()));
    }

    @GetMapping("/journal/{journalId}")
    @Operation(summary = "Counts echoes by journal")
    public ResponseEntity<Long> countByJournal(@PathVariable int journalId) {
        Optional<Journal> journal = journalService.findById(journalId);

        if(journal.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(service.countByJournal(journal.get()));
    }

    @PostMapping
    @Operation(summary = "Creates an Echo")
    public ResponseEntity<Object> create(@RequestBody EchoCreate echoCreate) {
        Result<Echo> result = service.create(echoCreate);

        if(!result.isSuccess()) {
            return ErrorResponse.build(result);
        }


        return new ResponseEntity<>(EchoMapper.toResponse(result.getPayload()), HttpStatus.CREATED);
    }


    @DeleteMapping("/{echoId}")
    @Operation(summary = "Deletes an echo")
    public ResponseEntity<Object> deleteById(@PathVariable int echoId) {
        service.deleteById(echoId);
        return ResponseEntity.noContent().build();
    }
}
