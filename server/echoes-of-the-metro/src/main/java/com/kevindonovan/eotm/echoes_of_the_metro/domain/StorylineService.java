package com.kevindonovan.eotm.echoes_of_the_metro.domain;

import com.kevindonovan.eotm.echoes_of_the_metro.data.AppUserRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.StorylineRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.mappers.StoryLineMapper;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUser;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.StorylineCreate;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.StorylineResponse;
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

    public Result<StorylineResponse> create(StorylineCreate storylineCreate) {

        Storyline storyline = StoryLineMapper.fromRequest(storylineCreate, appUserRepository);

        Result<StorylineResponse> result = validate(storyline);

        if(!result.isSuccess()) {
            return result;
        }

        if(storyline.getStorylineId() != 0) {
            result.addMessages("STORYLINE ID CANNOT BE SET FOR `ADD` OPERATION", ResultType.INVALID);
            return result;
        }

        storyline = repository.save(storyline);
        result.setPayload(StoryLineMapper.toResponse(storyline));
        return result;
    }

    private Result<StorylineResponse> validate(Storyline storyline) {
        Result<StorylineResponse> result = new Result<>();

        if(storyline == null) {
            result.addMessages("STORYLINE CANNOT BE NULL", ResultType.INVALID);
            return result;
        }

        if(storyline.getAppUser() == null || storyline.getAppUser().getAppUserId() <= 0) {
            result.addMessages("APPUSER NEEDS TO EXIST", ResultType.INVALID);
            return result;
        }

        Optional<AppUser> appUser = appUserRepository.findById(storyline.getAppUser().getAppUserId());

        if(appUser.isEmpty()) {
            result.addMessages("APPUSER DOES NOT EXIST", ResultType.INVALID);
            return result;
        }

        if(storyline.getStorylineTitle() == "" || storyline.getStorylineTitle().isBlank()) {
            result.addMessages("STORYLINE TITLE CANNOT BE BLANK OR NULL", ResultType.INVALID);
        }

        return result;
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
