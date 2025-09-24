package com.kevindonovan.eotm.echoes_of_the_metro.controllers;


import com.kevindonovan.eotm.echoes_of_the_metro.domain.EventService;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.mappers.EventMapper;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.EventResponse;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Event;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@Tag(name = "Event Controller", description = "Event Operations")
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("/{eventId}")
    @Operation(summary = "Find event by ID")
    public ResponseEntity<EventResponse> findById(@PathVariable int eventId) {
        Optional<Event> event = eventService.findById(eventId);

        if(event.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(EventMapper.toResponse(event.get()));
    }

    @GetMapping("/event/{locationId}/{userId}")
    @Operation(summary = "Generates an event randomly")
    public ResponseEntity<EventResponse> generateEvent(@PathVariable int locationId, @PathVariable int userId) {
        Event event = eventService.generateEvent(locationId, userId);

        return ResponseEntity.ok(EventMapper.toResponse(event));
    }
}
