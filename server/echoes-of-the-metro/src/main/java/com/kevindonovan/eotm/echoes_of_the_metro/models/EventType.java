package com.kevindonovan.eotm.echoes_of_the_metro.models;

import java.util.Arrays;
import java.util.Random;

public enum EventType {
    ATTACK(5),
    ENCOUNTER(5),
    ARTIFACT(1),
    ANOMALY(5),
    STANDARD(75),
    LOCATION(9);

    private final int weight;

    EventType(int weight) {
        this.weight = weight;
    }

    public int getWeight() {
        return weight;
    }

    public static EventType getRandomType() {
        int totalWeight = Arrays.stream(EventType.values())
                .mapToInt(EventType::getWeight)
                .sum();

        int random = new Random().nextInt(totalWeight);
        int current = 0;

        for(EventType type : EventType.values()) {
            current += type.getWeight();
            if(random < current) {
                return type;
            }
        }

        return null;
    }
}
