package com.kevindonovan.eotm.echoes_of_the_metro.controllers;

import com.kevindonovan.eotm.echoes_of_the_metro.domain.LocationService;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.mappers.LocationMapper;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.LocationResponse;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Location;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@Tag(name = "Location Controller", description = "Location Operations")
@RequestMapping("/api/locations")
public class LocationController {

    private final LocationService locationService;

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping("/{locationId}")
    public ResponseEntity<LocationResponse> findById(@PathVariable int locationId) {
        Optional<Location> location = locationService.findById(locationId);

        if(location.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(LocationMapper.toResponse(location.get()));
    }

    @GetMapping
    public ResponseEntity<List<LocationResponse>> findAll() {

        List<Location> locations = locationService.findAll();

        return ResponseEntity.ok(locations.stream().map(LocationMapper::toResponse).toList());
    }

}
