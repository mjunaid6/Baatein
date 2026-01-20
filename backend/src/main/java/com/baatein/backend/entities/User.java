package com.baatein.backend.entities;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @Column(updatable = false, name = "user_id")
    private String userId;

    @Column(name = "username", nullable = false)
    private String userName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String imgUrl;

    @ManyToMany
    @JoinTable(
        name = "user_friends",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "friend_id")
    )
    @JsonIgnore
    private Set<User> friends = new HashSet<>();

    @OneToMany(mappedBy = "receiver")
    private Set<FriendRequest> receivedRequests = new HashSet<>();

    @OneToMany(mappedBy = "sender")
    private Set<FriendRequest> sentRequests = new HashSet<>();

    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
    private RefreshToken refreshToken;
    
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name= "user_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles;
}
