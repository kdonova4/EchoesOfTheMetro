package com.kevindonovan.eotm.echoes_of_the_metro.domain;

import com.kevindonovan.eotm.echoes_of_the_metro.data.AppUserRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.JournalRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.LocationRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.StorylineRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.mappers.JournalMapper;
import com.kevindonovan.eotm.echoes_of_the_metro.models.*;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.JournalCreate;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.JournalResponse;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class JournalService {

    private final JournalRepository repository;
    private final AppUserRepository appUserRepository;
    private final LocationRepository locationRepository;
    private final StorylineRepository storylineRepository;

    public JournalService(JournalRepository repository, AppUserRepository appUserRepository, LocationRepository locationRepository, StorylineRepository storylineRepository) {
        this.repository = repository;
        this.appUserRepository = appUserRepository;
        this.locationRepository = locationRepository;
        this.storylineRepository = storylineRepository;
    }

    public List<Journal> findAll() {
        return repository.findAll();
    }

    public Optional<Journal> findById(int id) {
        return repository.findById(id);
    }

    public List<Journal> findByStoryline(Storyline storyline) {
        return repository.findByStoryline(storyline);
    }

    public List<Journal> findByAppUser(AppUser appUser) {
        return repository.findByAppUser(appUser);
    }

    public List<Journal> findByLocation(Location location) {
        return repository.findByLocation(location);
    }

    public List<Journal> findByEchoCount(long minCount) {
        return repository.findJournalsByEchoCount(minCount);
    }

    public Result<JournalResponse> create(JournalCreate journalCreate) {

        Journal journal = JournalMapper.fromCreate(journalCreate, storylineRepository, appUserRepository, locationRepository);

        Result<JournalResponse> result = validate(journal);

        if(!result.isSuccess()) {
            return result;
        }

        if(journal.getJournalId() != 0) {
            result.addMessages("JOURNAL ID CANNOT BE SET FOR `ADD` OPERATION", ResultType.INVALID);
            return result;
        }

        journal = repository.save(journal);
        result.setPayload(JournalMapper.toResponse(journal));
        return result;
    }

    @Scheduled(fixedRate = 60000)
    public void changeStatus() {
        List<Journal> freshJournals = repository.findJournalsByCreatedStatus(CreatedStatus.FRESH);
        List<Journal> fadedJournals = repository.findJournalsByCreatedStatus(CreatedStatus.FADED);
        List<Journal> weatheredJournals = repository.findJournalsByCreatedStatus(CreatedStatus.WEATHERED);
        List<Journal> witheredJournals = repository.findJournalsByCreatedStatus(CreatedStatus.WITHERED);

        for(Journal j : freshJournals) {

            if(j.getCreatedAt().toLocalDateTime().plusMinutes(1).isBefore(LocalDateTime.now())) {
                j.setCreatedStatus(CreatedStatus.FADED);
                repository.save(j);
            }
        }
    }

    private Result<JournalResponse> validate(Journal journal) {
        Result<JournalResponse> result = new Result<>();

        if(journal == null) {
            result.addMessages("JOURNAL CANNOT BE NULL", ResultType.INVALID);
            return result;
        }

        if(journal.getAppUser() == null || journal.getAppUser().getAppUserId() <= 0) {
            result.addMessages("APPUSER NEEDS TO EXIST", ResultType.INVALID);
            return result;
        }

        if(journal.getLocation() == null || journal.getLocation().getLocationId() <= 0) {
            result.addMessages("LOCATION NEEDS TO EXIST", ResultType.INVALID);
            return result;
        }

        Optional<Storyline> storyline = null;
        if(journal.getStoryline() != null) {
            storyline = storylineRepository.findById(journal.getStoryline().getStorylineId());
            if(journal.getStoryline().getStorylineId() <= 0) {
                result.addMessages("STORYLINE NEEDS TO EXIST", ResultType.INVALID);
                return result;
            }
        }

        Optional<AppUser> appUser = appUserRepository.findById(journal.getAppUser().getAppUserId());
        Optional<Location> location = locationRepository.findById(journal.getLocation().getLocationId());

        if(appUser.isEmpty()) {
            result.addMessages("APPUSER NOT FOUND", ResultType.INVALID);
            return result;
        }

        if(location.isEmpty()) {
            result.addMessages("LOCATION NOT FOUND", ResultType.INVALID);
            return result;
        }

        if(storyline != null) {
            if(storyline.isEmpty()) {
                result.addMessages("STORYLINE NOT FOUND", ResultType.INVALID);
                return result;
            }
        }

        if(journal.getTitle() == null || journal.getTitle().isBlank()) {
            result.addMessages("JOURNAL TITLE CANNOT BE BLANK OR NULL", ResultType.INVALID);
        } else if (journal.getTitle().length() > 50) {
            result.addMessages("JOURNAL TITLE CANNOT BE LONGER THAN 50 CHARACTERS", ResultType.INVALID);
        }

        if(journal.getText() == null || journal.getText().isBlank()) {
            result.addMessages("JOURNAL TEXT CANNOT BE BLANK OR NULL", ResultType.INVALID);
        } else if (journal.getText().length() > 5000) {
            result.addMessages("JOURNAL TEXT CANNOT BE LONGER THAN 5000 CHARACTERS", ResultType.INVALID);
        }

        return result;

    }

    public boolean deleteById(int id) {
        if(repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
