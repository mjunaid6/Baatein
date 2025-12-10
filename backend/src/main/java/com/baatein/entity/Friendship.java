package com.baatein.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "friendships", uniqueConstraints = @UniqueConstraint(columnNames = {"user1","user2"}))
public class Friendship {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long user1;
    private Long user2;
    private LocalDateTime createdAt = LocalDateTime.now();

    public Friendship() {}
    public Friendship(Long user1, Long user2) { this.user1 = user1; this.user2 = user2; }

    public Long getId(){return id;}
    public void setId(Long id){this.id=id;}
    public Long getUser1(){return user1;}
    public void setUser1(Long user1){this.user1=user1;}
    public Long getUser2(){return user2;}
    public void setUser2(Long user2){this.user2=user2;}
    public LocalDateTime getCreatedAt(){return createdAt;}
    public void setCreatedAt(LocalDateTime createdAt){this.createdAt=createdAt;}
}
