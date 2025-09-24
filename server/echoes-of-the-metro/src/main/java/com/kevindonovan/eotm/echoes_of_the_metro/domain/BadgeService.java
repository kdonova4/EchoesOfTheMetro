package com.kevindonovan.eotm.echoes_of_the_metro.domain;

import com.kevindonovan.eotm.echoes_of_the_metro.data.BadgeRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Badge;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BadgeService {

    private final BadgeRepository repository;

    public BadgeService(BadgeRepository repository) {
        this.repository = repository;
    }

    public Optional<Badge> findById(int id) {
        return repository.findById(id);
    }

    public Optional<Badge> findByBadgeName(String badgeName) {
        return repository.findByBadgeName(badgeName);
    }
}
