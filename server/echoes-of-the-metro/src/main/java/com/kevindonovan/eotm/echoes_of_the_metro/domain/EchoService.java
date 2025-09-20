package com.kevindonovan.eotm.echoes_of_the_metro.domain;

import com.kevindonovan.eotm.echoes_of_the_metro.data.AppUserRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.EchoRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.JournalRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUser;
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

    public Optional<Echo> findByJournalAndAppUser(Journal journal, AppUser appUser) {
        return repository.findByJournalAndAppUser(journal, appUser);
    }

    public long countByJournal(Journal journal) {
        return repository.countByJournal(journal);
    }

    public Result<Echo> create(Echo echo) {

        return null;
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
