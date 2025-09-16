package com.kevindonovan.eotm.echoes_of_the_metro.models;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class AppUserBadgeKey implements Serializable {

    @Column(name = "app_user_id")
    private int appUserId;

    @Column(name = "badge_id")
    private int badgeId;
}
