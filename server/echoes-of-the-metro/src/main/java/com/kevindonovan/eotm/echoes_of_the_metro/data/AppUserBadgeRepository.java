package com.kevindonovan.eotm.echoes_of_the_metro.data;

import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUser;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUserBadge;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUserBadgeKey;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Badge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AppUserBadgeRepository extends JpaRepository<AppUserBadge, AppUserBadgeKey> {

    Optional<AppUserBadgeRepository> findByAppUserAndBadge(AppUser appUser, Badge badge);

    List<AppUserBadgeRepository> findByAppUser(AppUser appUser);

}
