package com.kevindonovan.eotm.echoes_of_the_metro.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id")
    private int eventId;

    @Column(name = "event_text", nullable = false, length = 200)
    private String eventText;

    @Enumerated(EnumType.STRING)
    @Column(name = "event_type", nullable = false)
    private EventType eventType;

    @Column(name = "scrap_found")
    private int scrapFound;

    @Column(name = "fuel_found")
    private int fuelFound;

    @Column(name = "mgr_collected")
    private int mgrCollected;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id", nullable = true)
    private Location location;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "badge_id", nullable = true)
    private Badge badge;

    @Column(name = "sound_path", length = 200)
    private String soundPath;

    @Column(name = "media_path", length = 200)
    private String mediaPath;
}
