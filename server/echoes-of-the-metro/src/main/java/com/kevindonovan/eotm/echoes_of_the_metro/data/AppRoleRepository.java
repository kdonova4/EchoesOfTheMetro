package com.kevindonovan.eotm.echoes_of_the_metro.data;

import com.kevindonovan.eotm.echoes_of_the_metro.models.AppRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AppRoleRepository extends JpaRepository<AppRole, Integer> {

    Optional<AppRole> findByRoleName(String roleName);

}
