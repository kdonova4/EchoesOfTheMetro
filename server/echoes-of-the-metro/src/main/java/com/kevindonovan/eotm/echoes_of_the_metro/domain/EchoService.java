package com.kevindonovan.eotm.echoes_of_the_metro.domain;

import com.kevindonovan.eotm.echoes_of_the_metro.data.AppUserRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.EchoRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.JournalRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.domain.mappers.EchoMapper;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUser;
import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.EchoCreate;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Echo;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Journal;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EchoService {

    private final EchoRepository repository;
    private final AppUserRepository appUserRepository;
    private final JournalRepository journalRepository;

    public EchoService(EchoRepository repository, AppUserRepository appUserRepository, JournalRepository journalRepository) {
        this.repository = repository;
        this.appUserRepository = appUserRepository;
        this.journalRepository = journalRepository;
    }

    public Optional<Echo> findById(int id) {
        return repository.findById(id);
    }

    public Optional<Echo> findByJournalAndAppUser(Journal journal, AppUser appUser) {
        return repository.findByJournalAndAppUser(journal, appUser);
    }

    public long countByJournal(Journal journal) {
        return repository.countByJournal(journal);
    }

    public Result<Echo> create(EchoCreate echoCreate) {

        Echo echo = EchoMapper.toEcho(echoCreate, journalRepository, appUserRepository);

        Result<Echo> result = validate(echo);

        if(!result.isSuccess()) {
            return result;
        }

        if(echo.getEchoId() != 0) {
            result.addMessages("ECHO ID CANNOT BE SET FOR `ADD` OPERATION", ResultType.INVALID);
            return result;
        }

        echo = repository.save(echo);
        result.setPayload(echo);
        return result;
    }

    public Result<Echo> validate(Echo echo) {
        Result<Echo> result = new Result<>();

        if(echo == null) {
            result.addMessages("ECHO CANNOT BE NULL", ResultType.INVALID);
            return result;
        }

        if(echo.getAppUser() == null || echo.getAppUser().getAppUserId() <= 0) {
            result.addMessages("APPUSER NEEDS TO EXIST", ResultType.INVALID);
            return result;
        }

        if(echo.getJournal() == null || echo.getJournal().getJournalId() <= 0) {
            result.addMessages("JOURNAL NEEDS TO EXIST", ResultType.INVALID);
            return result;
        }

        Optional<Journal> journal = journalRepository.findById(echo.getJournal().getJournalId());
        Optional<AppUser> appUser = appUserRepository.findById(echo.getAppUser().getAppUserId());

        if(appUser.isEmpty()) {
            result.addMessages("APPUSER DOES NOT EXIST", ResultType.INVALID);
            return result;
        }

        if(journal.isEmpty()) {
            result.addMessages("JOURNAL DOES NOT EXIST", ResultType.INVALID);
            return result;
        }

        return result;
    }

    public boolean deleteById(int id) {
        if(repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
