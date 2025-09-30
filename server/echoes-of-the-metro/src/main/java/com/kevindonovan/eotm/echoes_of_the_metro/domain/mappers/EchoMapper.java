package com.kevindonovan.eotm.echoes_of_the_metro.domain.mappers;

import com.kevindonovan.eotm.echoes_of_the_metro.data.AppUserRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.JournalRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUser;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.EchoCreate;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.EchoResponse;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Echo;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Journal;

import java.util.NoSuchElementException;

public class EchoMapper {

    public static Echo toEcho(EchoCreate echoCreate, JournalRepository journalRepository, AppUserRepository appUserRepository) {
        AppUser appUser = appUserRepository.findById(echoCreate.getAppUserId()).orElseThrow(() -> new NoSuchElementException("User not found"));
        Journal journal = journalRepository.findById(echoCreate.getJournalId()).orElseThrow(() -> new NoSuchElementException("Journal not found"));

        return new Echo(0, journal, appUser);
    }

    public static EchoResponse toResponse(Echo echo) {
        return new EchoResponse(
                echo.getEchoId(),
                echo.getAppUser().getAppUserId(),
                echo.getJournal().getJournalId()
        );
    }
}
