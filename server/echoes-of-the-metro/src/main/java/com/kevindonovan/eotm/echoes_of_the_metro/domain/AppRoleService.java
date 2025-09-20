package com.kevindonovan.eotm.echoes_of_the_metro.domain;

import com.kevindonovan.eotm.echoes_of_the_metro.data.AppRoleRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppRole;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AppRoleService {

    private final AppRoleRepository repository;

    public AppRoleService(AppRoleRepository repository) {
        this.repository = repository;
    }

    public Optional<AppRole> findByRoleName(String roleName) {
        return repository.findByRoleName(roleName);
    }
}
