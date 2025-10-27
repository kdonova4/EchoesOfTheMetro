package com.kevindonovan.eotm.echoes_of_the_metro.data;

import com.kevindonovan.eotm.echoes_of_the_metro.models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JournalRepository extends JpaRepository<Journal, Integer> {

    List<Journal> findByStoryline(Storyline storyline);

    List<Journal> findByAppUser(AppUser appUser);

    List<Journal> findByLocation(Location location);

    @Query("""
                SELECT j 
                FROM Journal j 
                LEFT JOIN Echo e ON e.journal = j
                GROUP BY j
                HAVING COUNT(e) >= :minCount
                ORDER BY COUNT(e) DESC
            """)
    List<Journal> findJournalsByEchoCount(@Param("minCount") long minCount);

    List<Journal> findJournalsByCreatedStatus(CreatedStatus status);

}
