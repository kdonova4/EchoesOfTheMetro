package com.kevindonovan.eotm.echoes_of_the_metro.data;

import com.kevindonovan.eotm.echoes_of_the_metro.models.Storyline;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StorylineRepository extends JpaRepository<Storyline, Integer> {

    Optional<Storyline> findByStorylineTitle(String storylineTitle);

}
