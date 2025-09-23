package com.kevindonovan.eotm.echoes_of_the_metro.domain.mappers;

import com.kevindonovan.eotm.echoes_of_the_metro.data.AppUserRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUser;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.AppUserResponse;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.StorylineCreate;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.StorylineResponse;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Storyline;

import java.util.Collections;
import java.util.NoSuchElementException;

public class StoryLineMapper {


    public static StorylineResponse toResponse(Storyline storyline) {


        return new StorylineResponse(
                storyline.getStorylineId(),
                storyline.getStorylineTitle(),
                new AppUserResponse(
                        storyline.getAppUser().getAppUserId(),
                        storyline.getAppUser().getUsername(),
                        storyline.getAppUser().getMgr(),
                        storyline.getAppUser().getScrap(),
                        storyline.getAppUser().getFuel(),
                        AppUserBadgeMapper.toResponse(storyline.getAppUser().getBadges())
                )
        );
    }

    public static Storyline fromRequest(StorylineCreate storylineCreate, AppUserRepository appUserRepository) {

        AppUser appUser = appUserRepository.findById(storylineCreate.getAppUserId()).orElseThrow(() -> new NoSuchElementException("User Not Found"));

        return new Storyline(0, storylineCreate.getStorylineTitle(),
                appUser, Collections.emptyList());
    }
}
