package com.kevindonovan.eotm.echoes_of_the_metro.domain.mappers;

import com.kevindonovan.eotm.echoes_of_the_metro.models.DTOs.EventResponse;
import com.kevindonovan.eotm.echoes_of_the_metro.models.Event;

public class EventMapper {

    public static EventResponse toResponse(Event event) {
        return new EventResponse(
                event.getEventId(),
                event.getEventText(),
                event.getEventType(),
                event.getScrapFound(),
                event.getFuelFound(),
                event.getMgrCollected(),
                event.getLocation() != null ? event.getLocation().getLocationId() : 0,
                event.getBadge() != null ? event.getBadge().getBadgeId() : 0,
                event.getSoundPath(),
                event.getMediaPath()
        );
    }




}
