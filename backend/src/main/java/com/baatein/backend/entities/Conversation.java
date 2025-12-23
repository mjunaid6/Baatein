package com.baatein.backend.entities;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "conversations")
@Getter
@Setter
public class Conversation {

    @Id
    @Column(length = 12, unique = true, nullable = false)
    private String conversationId;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "conversation_users",
        joinColumns = @JoinColumn(name = "conversation_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> participants = new HashSet<>();

    @CreationTimestamp
    private LocalDateTime createdAt;

    @PrePersist
    private void ensureConversationId() {
        if (this.conversationId == null) {
            this.conversationId = IdGenerator.generateUserId(12);
        }
        if (participants.size() < 2) {
            throw new IllegalStateException("Conversation must have at least 2 participants");
        }
    }
}

