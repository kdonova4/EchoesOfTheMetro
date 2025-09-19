package com.kevindonovan.eotm.echoes_of_the_metro.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@RequiredArgsConstructor
@Table(name = "storylines")
public class Storyline {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "storyline_id")
    private int storylineId;

    @NonNull
    @Column(name = "storyline_title", nullable = false, length = 50, unique = true)
    private String storylineTitle;

    @NonNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "app_user_id")
    private AppUser appUser;

    @OneToMany(mappedBy = "storyline", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Journal> journals = new ArrayList<>();
}
