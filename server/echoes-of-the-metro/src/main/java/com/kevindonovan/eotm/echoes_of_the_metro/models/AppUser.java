package com.kevindonovan.eotm.echoes_of_the_metro.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "app_user")
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "app_user_id")
    private int appUserId;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false, unique = true, length = 254)
    private String email;

    @Column(name = "password_hash", nullable = false, length = 2048)
    private String password;

    @Column(name = "mgr", nullable = false)
    private int mgr;

    @Column(name = "scrap", nullable = false)
    private int scrap;

    @Column(name = "fuel", nullable = false)
    private int fuel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "app_role_id", nullable = false)
    private AppRole appRole;

    @Column(nullable = false)
    private boolean disabled;

    @OneToMany(mappedBy = "appUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AppUserBadge> badges;
}
