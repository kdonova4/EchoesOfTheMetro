package com.kevindonovan.eotm.echoes_of_the_metro.domain;

import com.kevindonovan.eotm.echoes_of_the_metro.data.AppRoleRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.AppUserRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.mappers.AppUserMapper;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppRole;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUser;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.AppUserResponse;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.AppUserUpdate;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import jakarta.validation.ValidationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class AppUserService implements UserDetailsService {

    private final AppUserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final AppRoleRepository appRoleRepository;

    public AppUserService(AppUserRepository repository, PasswordEncoder passwordEncoder, AppRoleRepository appRoleRepository) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.appRoleRepository = appRoleRepository;
    }

    public Optional<AppUser> findById(int id) {
        return repository.findById(id);
    }

    public Optional<AppUser> findByEmail(String email) {
        return repository.findByEmail(email);
    }

    public Optional<AppUser> findByUsername(String username) {
        return repository.findByUsername(username);
    }

    public Optional<AppUser> findByUsernameAndPassword(String username, String password) {
        return repository.findByUsernameAndPassword(username, password);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<AppUser> appUser = repository.findByUsername(username);

        User.UserBuilder builder = null;
        if (appUser.isPresent()) {
            AppUser currentUser = appUser.get();
            builder = User.withUsername(username);
            builder.password(currentUser.getPassword());
            builder.roles(currentUser.getAppRole().getRoleName());
        } else {
            throw new UsernameNotFoundException("User Not Found");
        }

        return builder.build();
    }

    public AppUser createStalker(AccountCredentials accountCredentials) {
        validateUsername(accountCredentials.username());
        validateEmail(accountCredentials.email());
        validatePassword(accountCredentials.password());

        String encodedPassword = passwordEncoder.encode(accountCredentials.password());

        AppRole stalker = appRoleRepository.findByRoleName("STALKER").orElseThrow(() -> new NoSuchElementException("Could not find correct role"));

        AppUser appUser = new AppUser(0, accountCredentials.username(), accountCredentials.email(), encodedPassword, 0, 0, 0, stalker, false, Collections.emptyList());

        return repository.save(appUser);
    }

    public void validateUsername(String username) {

        if (username == null || username.isBlank()) {
            throw new ValidationException("Username is REQUIRED");
        }

        if (username.length() > 50) {
            throw new ValidationException("Username MUST BE LESS THAN 50 CHARACTERS");
        }
    }

    private void validatePassword(String password) {
        if (password == null || password.isBlank()) {
            throw new ValidationException("Password MUST BE AT LEAST 8 CHARACTERS");
        }

        int digits = 0;
        int letters = 0;
        int others = 0;

        for (char c : password.toCharArray()) {
            if (Character.isDigit(c)) {
                digits++;
            } else if (Character.isLetter(c)) {
                letters++;
            } else {
                others++;
            }
        }

        if (digits == 0 || letters == 0 || others == 0) {
            throw new ValidationException("Password MUST CONTAIN A DIGIT, A LETTER, AND A NON-DIGIT/NON-LETTER");
        }
    }

    private void validateEmail(String email) {
        if (email == null || email.isBlank()) {
            throw new ValidationException("Email is REQUIRED");
        }

        if (email.length() > 254) {
            throw new ValidationException("Email MUST BE LESS THAN 255 CHARACTERS");
        }

        if (!email.contains("@") || !email.contains(".")) {
            throw new ValidationException("Email appears to be invalid");
        }

        if (repository.findByEmail(email).isPresent()) {
            throw new ValidationException("Email Already In Use");
        }
    }

    public Result<AppUserResponse> updateStalker(AppUserUpdate appUserUpdate) {

        Result<AppUserResponse> result = validateStalker(appUserUpdate);
        if (!result.isSuccess()) {
            return result;
        }

        AppUser existingUser = repository.findById(appUserUpdate.getAppUserId()).orElse(null);
        if (existingUser == null) {
            result.addMessages("APPUSER NOT FOUND", ResultType.NOT_FOUND);
            return result;
        }

        existingUser.setFuel(appUserUpdate.getFuel());
        existingUser.setScrap(appUserUpdate.getScrap());
        existingUser.setMgr(appUserUpdate.getMgr());

        existingUser = repository.save(existingUser);
        result.setPayload(AppUserMapper.toResponse(existingUser));
        return result;
    }

    private Result<AppUserResponse> validateStalker(AppUserUpdate appUserUpdate) {
        Result<AppUserResponse> result = new Result<>();

        if (appUserUpdate == null) {
            result.addMessages("APPUSER CANNOT BE NULL", ResultType.INVALID);
            return result;
        }

        if (appUserUpdate.getAppUserId() <= 0) {
            result.addMessages("VALID APPUSER ID IS REQUIRED", ResultType.INVALID);
        } else if (repository.findById(appUserUpdate.getAppUserId()).isEmpty()) {
            result.addMessages("User does not exist", ResultType.INVALID);
        }

        if (appUserUpdate.getMgr() < 0 || appUserUpdate.getScrap() < 0 || appUserUpdate.getFuel() < 0) {
            result.addMessages("SCRAP, MGR AND FUEL ALL MUST BE GREATER OR EQUAL TO ZERO", ResultType.INVALID);
        }

        return result;
    }


}
