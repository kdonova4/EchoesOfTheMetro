package com.kevindonovan.eotm.echoes_of_the_metro.data;

import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUser;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUserBadgeKey;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Badge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AppUserBadge extends JpaRepository<AppUserBadge, AppUserBadgeKey> {

    Optional<AppUserBadge> findByAppUserAndBadge(AppUser appUser, Badge badge);

    List<AppUserBadge> findByAppUser(AppUser appUser);

}
