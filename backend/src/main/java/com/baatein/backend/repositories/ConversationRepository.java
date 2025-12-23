package com.baatein.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.baatein.backend.entities.Conversation;
import com.baatein.backend.entities.User;

public interface ConversationRepository extends JpaRepository<Conversation, String> {
    @Query(
        """
                SELECT c from Conversation c
                JOIN c.participants u1
                JOIN c.participants u2
                WHERE u1 = :user1 AND u2 = :user2
                """
    )
    Optional<Conversation> findConversationBetweenUsers(User user1, User user2);
}
