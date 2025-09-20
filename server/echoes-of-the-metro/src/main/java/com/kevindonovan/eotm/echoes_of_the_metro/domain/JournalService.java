package com.kevindonovan.eotm.echoes_of_the_metro.domain;

import com.kevindonovan.eotm.echoes_of_the_metro.data.AppUserRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.JournalRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.LocationRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.StorylineRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUser;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Journal;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Location;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Storyline;
import org.springframework.stereotype.Service;

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

    public Result<Journal> create(Journal journal) {
        Result<Journal> result = validate(journal);

        if(!result.isSuccess()) {
            return result;
        }

        if(journal.getJournalId() != 0) {
            result.addMessages("JOURNAL ID CANNOT BE SET FOR `ADD` OPERATION", ResultType.INVALID);
            return result;
        }

        journal = repository.save(journal);
        result.setPayload(journal);
        return result;
    }

    private Result<Journal> validate(Journal journal) {
        Result<Journal> result = new Result<>();

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

        if(journal.getText() == null || journal.getText().isBlank()) {
            result.addMessages("JOURNAL TEXT CANNOT BE BLANK OR NULL", ResultType.INVALID);
        } else if (journal.getText().length() > 5000) {
            result.addMessages("JOURNAL TEXT CANNOT BE LONGER THAN 5000 CHARACTERS", ResultType.INVALID);
        }

        if(journal.getTitle() == null || journal.getTitle().isBlank()) {
            result.addMessages("JOURNAL TITLE CANNOT BE BLANK OR NULL", ResultType.INVALID);
        } else if (journal.getText().length() > 50) {
            result.addMessages("JOURNAL TITLE CANNOT BE LONGER THAN 5000 CHARACTERS", ResultType.INVALID);
        }

        if(journal.getCreatedStatus() == null) {
            result.addMessages("CREATED STATUS CANNOT BE NULL", ResultType.INVALID);
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
