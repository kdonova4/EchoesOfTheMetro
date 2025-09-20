package com.kevindonovan.eotm.echoes_of_the_metro.domain;

import com.kevindonovan.eotm.echoes_of_the_metro.data.AppUserRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.StorylineRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUser;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Storyline;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StorylineService {

    private final StorylineRepository repository;
    private final AppUserRepository appUserRepository;


    public StorylineService(StorylineRepository repository, AppUserRepository appUserRepository) {
        this.repository = repository;
        this.appUserRepository = appUserRepository;
    }

    public Optional<Storyline> findByStorylineTitle(String storylineTitle) {
        return repository.findByStorylineTitle(storylineTitle);
    }

    public List<Storyline> findStorylineByAppUser(AppUser appUser) {
        return repository.findStorylineByAppUser(appUser);
    }

    public Result<Storyline> create(Storyline storyline) {

        return null;
    }

    public boolean deleteById(int id) {
        if(repository.existsById(id)){
            repository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
