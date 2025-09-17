package com.kevindonovan.eotm.echoes_of_the_metro.data;

import com.kevindonovan.eotm.echoes_of_the_metro.models.Badge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BadgeRepository extends JpaRepository<Badge, Integer> {

    Optional<Badge> findByBadgeName(String badgeName);

}
