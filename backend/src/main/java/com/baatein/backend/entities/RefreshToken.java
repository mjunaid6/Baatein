package com.baatein.backend.entities;


import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@Builder
public class RefreshToken {
    @Id
    private String token;

    private Date expiry;
    
    @OneToOne
    @JoinColumn(name = "user_id" , referencedColumnName = "user_id", nullable = false)
    private User user;
}
