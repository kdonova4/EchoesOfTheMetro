package com.kevindonovan.eotm.echoes_of_the_metro;

import com.kevindonovan.eotm.echoes_of_the_metro.data.BadgeRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.data.StorylineRepository;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Badge;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Storyline;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EchoesOfTheMetroApplication implements CommandLineRunner {

	private final BadgeRepository badgeRepository;
	private final StorylineRepository storylineRepository;

    public EchoesOfTheMetroApplication(BadgeRepository badgeRepository, StorylineRepository storylineRepository) {
        this.badgeRepository = badgeRepository;
        this.storylineRepository = storylineRepository;
    }

    public static void main(String[] args) {
		SpringApplication.run(EchoesOfTheMetroApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		badgeRepository.save(new Badge(0, "test", "test_image"));
		storylineRepository.save(new Storyline(0, "Test Title"));
	}
}
