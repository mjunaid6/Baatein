package com.baatein.backend.entities;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "conversations")
@Getter
@Setter
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String conversationId;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "conversation_users",
        joinColumns = @JoinColumn(name = "conversation_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> participants = new HashSet<>();

    @Column(name = "conversation_code", unique = true, nullable = false)
    private String conversationCode;

    @Enumerated(EnumType.STRING)
    private Type type;

    private String name;
    private String imgUrl;

    @CreationTimestamp
    private LocalDateTime createdAt;

    public enum Type {
        PRIVATE,
        GROUP
    }
}

