package com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs;

import com.kevindonovan.eotm.echoes_of_the_metro.models.EventType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventResponse {

    private int eventId;
    private String text;
    private EventType eventType;
    private int scrapFound;
    private int fuelFound;
    private int mgrCollected;
    private int locationId;
    private int badgeId;
    private String soundPath;
    private String mediaPath;
}
