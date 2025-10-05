package com.kevindonovan.eotm.echoes_of_the_metro.domain.mappers;

import com.kevindonovan.eotm.echoes_of_the_metro.data.AppUserRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.LocationRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.StorylineRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUser;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.JournalCreate;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.JournalResponse;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Journal;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Location;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Storyline;

import java.util.Collections;
import java.util.NoSuchElementException;

public class JournalMapper {

    public static JournalResponse toResponse(Journal journal) {

        return new JournalResponse(
                journal.getJournalId(),
                journal.getTitle(),
                journal.getText(),
                journal.getStoryline() != null ? journal.getStoryline().getStorylineId() : 0,
                journal.getAppUser().getAppUserId(),
                journal.getAppUser().getUsername(),
                journal.getWhispers(),
                journal.getLocation().getLocationId(),
                journal.getCreatedAt(),
                journal.getCreatedStatus()
        );
    }

    public static Journal fromCreate(JournalCreate journalCreate, StorylineRepository storylineRepository,
                                       AppUserRepository appUserRepository, LocationRepository locationRepository) {
        Storyline storyline = null;
        if(journalCreate.getStorylineId() != 0) {
            storyline = storylineRepository.findById(journalCreate.getStorylineId()).orElseThrow(() -> new NoSuchElementException("Storyline not found"));
        }
        AppUser appUser = appUserRepository.findById(journalCreate.getAppUserId()).orElseThrow(() -> new NoSuchElementException("User not found"));
        Location location = locationRepository.findById(journalCreate.getLocationId()).orElseThrow(() -> new NoSuchElementException("Location not found"));

        return new Journal(
                0,
                journalCreate.getTitle(),
                journalCreate.getText(),
                storyline,
                appUser,
                location,
                0,
                null,
                null,
                Collections.emptyList()
        );
    }

}
