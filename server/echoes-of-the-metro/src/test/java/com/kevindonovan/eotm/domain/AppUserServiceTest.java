package com.kevindonovan.eotm.domain;

import com.kevindonovan.eotm.echoes_of_the_metro.data.AppRoleRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.AppUserRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.AccountCredentials;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.AppUserService;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.Result;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.ResultType;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppRole;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUser;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AppUserServiceTest {

    @Mock
    AppUserRepository repository;

    @Mock
    AppRoleRepository appRoleRepository;

    @Mock
    PasswordEncoder passwordEncoder;

    @InjectMocks
    AppUserService service;

    private AppUser appUser;
    private AppRole appRole;

    @BeforeEach
    void setup() {
        appRole = new AppRole(1, "STALKER");
        appUser = new AppUser(1, "kevin123", "kevin123@gmail.com", "85c*98Kd", 0, 0, 0, appRole, false, Collections.emptyList());
    }

    @Test
    void shouldFindById() {
        when(repository.findById(appUser.getAppUserId())).thenReturn(Optional.of(appUser));

        Optional<AppUser> actual = service.findById(appUser.getAppUserId());

        assertTrue(actual.isPresent());
        verify(repository).findById(appUser.getAppUserId());
    }

    @Test
    void shouldFindByEmail() {
        when(repository.findByEmail(appUser.getEmail())).thenReturn(Optional.of(appUser));

        Optional<AppUser> actual = service.findByEmail(appUser.getEmail());

        assertTrue(actual.isPresent());
        verify(repository).findByEmail(appUser.getEmail());
    }

    @Test
    void shouldFindByUsername() {
        when(repository.findByUsername(appUser.getUsername())).thenReturn(Optional.of(appUser));

        Optional<AppUser> actual = service.findByUsername(appUser.getUsername());

        assertTrue(actual.isPresent());
        verify(repository).findByUsername(appUser.getUsername());
    }

    @Test
    void shouldFindByUsernameAndPassword() {
        when(repository.findByUsernameAndPassword(appUser.getUsername(), appUser.getPassword())).thenReturn(Optional.of(appUser));

        Optional<AppUser> actual = service.findByUsernameAndPassword(appUser.getUsername(), appUser.getPassword());

        assertTrue(actual.isPresent());
        verify(repository).findByUsernameAndPassword(appUser.getUsername(), appUser.getPassword());
    }

    @Test
    void shouldCreateStalker() {
        AppUser mockOut = new AppUser(1, "kevin123", "kevin123@gmail.com", "$2y$10$u7XIrEK5i1YcHj58AbbcXelE41THfTe.Tqntr4zvLaPdwFLGzkCHi", 0, 0, 0, appRole, false, Collections.emptyList());
        AccountCredentials accountCredentials = new AccountCredentials(appUser.getEmail(), appUser.getUsername(), appUser.getPassword());
        appUser.setAppUserId(0);


        when(passwordEncoder.encode(accountCredentials.password())).thenReturn("$2y$10$u7XIrEK5i1YcHj58AbbcXelE41THfTe.Tqntr4zvLaPdwFLGzkCHi");
        when(appRoleRepository.findByRoleName("STALKER")).thenReturn(Optional.of(appRole));
        appUser.setPassword("$2y$10$u7XIrEK5i1YcHj58AbbcXelE41THfTe.Tqntr4zvLaPdwFLGzkCHi");
        when(repository.save(appUser)).thenReturn(mockOut);

        AppUser actual = service.createStalker(accountCredentials);

        assertEquals(mockOut, actual);
    }


    @Test
    void shouldUpdateStalker() {
        appUser.setMgr(5);
        appUser.setFuel(10);
        appUser.setScrap(2);

        when(repository.findById(appUser.getAppUserId())).thenReturn(Optional.of(appUser));

        Result<AppUser> actual = service.updateStalker(appUser);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotUpdateInvalidStalker() {
        appUser.setAppUserId(0);

        Result<AppUser> actual = service.updateStalker(appUser);
        assertEquals(ResultType.INVALID, actual.getType());

        appUser.setAppUserId(1);
        when(repository.findById(appUser.getAppUserId())).thenReturn(Optional.of(appUser));
        appUser.setMgr(-5);
        service.updateStalker(appUser);
        assertEquals(ResultType.INVALID, actual.getType());

        appUser.setMgr(5);
        appUser.setFuel(-5);
        service.updateStalker(appUser);
        assertEquals(ResultType.INVALID, actual.getType());

        appUser.setFuel(5);
        appUser.setScrap(-5);
        service.updateStalker(appUser);
        assertEquals(ResultType.INVALID, actual.getType());

        appUser.setScrap(5);
        when(repository.findById(appUser.getAppUserId())).thenReturn(Optional.empty());
        service.updateStalker(appUser);
        assertEquals(ResultType.INVALID, actual.getType());
    }

}
