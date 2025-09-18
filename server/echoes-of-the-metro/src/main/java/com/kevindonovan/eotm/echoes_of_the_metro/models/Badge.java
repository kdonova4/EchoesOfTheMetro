package com.kevindonovan.eotm.echoes_of_the_metro.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "badges")
public class Badge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "badge_id")
    private int badgeId;

    @Column(name = "badge_name", nullable = false, length = 50)
    private String badgeName;

    @Column(name = "badge_image_path", nullable = false, length = 200)
    private String badgeImagePath;
}
