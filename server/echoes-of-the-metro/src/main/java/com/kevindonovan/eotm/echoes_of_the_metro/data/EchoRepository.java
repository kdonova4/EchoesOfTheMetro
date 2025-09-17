package com.kevindonovan.eotm.echoes_of_the_metro.data;

import com.kevindonovan.eotm.echoes_of_the_metro.models.AppUser;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Echo;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Journal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EchoRepository extends JpaRepository<Echo, Integer> {

    Optional<Echo> findByJournalAndAppUser(Journal journal, AppUser appUser);

    long countByJournal(Journal journal);

}
