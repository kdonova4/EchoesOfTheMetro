package com.kevindonovan.eotm.echoes_of_the_metro.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(
        name = "echoes",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"journal_id", "app_user_id"})
        }
)
public class Echo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "echo_id")
    private int echoId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "journal_id", nullable = false)
    private Journal journal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "app_user_id")
    private AppUser appUser;
}
