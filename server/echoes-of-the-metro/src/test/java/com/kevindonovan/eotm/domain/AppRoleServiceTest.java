package com.kevindonovan.eotm.domain;

import com.kevindonovan.eotm.echoes_of_the_metro.data.AppRoleRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.AppRoleService;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppRole;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AppRoleServiceTest {

    @Mock
    AppRoleRepository repository;

    @InjectMocks
    AppRoleService service;

    private AppRole appRole;

    @BeforeEach
    void setup() {
        appRole = new AppRole(1, "STALKER");
    }

    @Test
    void shouldFindByRoleName() {
        when(repository.findByRoleName(appRole.getRoleName())).thenReturn(Optional.of(appRole));

        Optional<AppRole> actual = service.findByRoleName(appRole.getRoleName());

        assertTrue(actual.isPresent());
        verify(repository).findByRoleName(appRole.getRoleName());
    }
}
