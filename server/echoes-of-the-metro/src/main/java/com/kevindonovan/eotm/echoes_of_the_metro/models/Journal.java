package com.kevindonovan.eotm.echoes_of_the_metro.models;

import jakarta.persistence.*;
import jdk.jfr.EventType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "journal")
public class Journal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "journal_id")
    private int journalId;

    @Column(name = "title", nullable = false, length = 50)
    private String title;

    @Column(name = "text", nullable = false, length = 5000)
    private String text;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "storyline_id")
    private Storyline storyline;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "app_user_id", nullable = false)
    private AppUser appUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;

    @Column(name = "whispers", nullable = false)
    private int whispers;

    @CreationTimestamp
    @Column(name="created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "created_status", length = 50 , nullable = false)
    private CreatedStatus createdStatus;

    @OneToMany(mappedBy = "journal", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Echo> echoes = new ArrayList<>();
}
