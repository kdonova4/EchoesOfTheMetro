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
        return null;
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
