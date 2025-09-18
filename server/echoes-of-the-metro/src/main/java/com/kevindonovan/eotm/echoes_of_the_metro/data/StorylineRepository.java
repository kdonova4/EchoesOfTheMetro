package com.kevindonovan.eotm.echoes_of_the_metro.data;

import com.kevindonovan.eotm.echoes_of_the_metro.models.Storyline;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StorylineRepository extends JpaRepository<Storyline, Integer> {

    Optional<Storyline> findByStorylineTitle(String storylineTitle);

}
