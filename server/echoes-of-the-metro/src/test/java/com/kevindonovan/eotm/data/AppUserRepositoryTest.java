package com.kevindonovan.eotm.data;

import com.kevindonovan.eotm.echoes_of_the_metro.data.AppRoleRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.AppUserRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppRole;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUser;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class AppUserRepositoryTest {

    @Autowired
    AppUserRepository repository;

    @Autowired
    AppRoleRepository appRoleRepository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setUp() {
        knownGoodState.set();
    }

    @Test
    void shouldFindByUsername() {
        Optional<AppUser> appUser = repository.findByUsername("shadowrunner");

        assertTrue(appUser.isPresent());
    }

    @Test
    void shouldFindByEmail() {
        Optional<AppUser> appUser = repository.findByEmail("shadow@example.com");

        assertTrue(appUser.isPresent());
    }

    @Test
    void shouldCreate() {
        AppRole role = appRoleRepository.findByRoleName("STALKER").get();
        AppUser appUser = new AppUser(0, "kevin123", "kevin123@gmail.com", "85c*98Kd", 0, 0, 0, role, false, Collections.emptyList());
        repository.save(appUser);
        assertEquals(4, repository.findAll().size());
    }

    @Test
    void shouldUpdate() {
        Optional<AppUser> user = repository.findById(1);
        user.get().setEmail("kdonova2223@gmail.com");
        repository.save(user.get());

        assertEquals("kdonova2223@gmail.com", repository.findById(1).get().getEmail());
    }
}
