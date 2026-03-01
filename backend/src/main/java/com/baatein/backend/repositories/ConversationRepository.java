package com.baatein.backend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.baatein.backend.entities.Conversation;
import com.baatein.backend.entities.User;

public interface ConversationRepository extends JpaRepository<Conversation, String> {
    @Query("""
        SELECT c FROM Conversation c
        WHERE SIZE(c.participants) = 2
        AND :user1 MEMBER OF c.participants
        AND :user2 MEMBER OF c.participants
    """)
    Optional<Conversation> findPrivateConversation(User user1, User user2);

    @Query("""
        SELECT DISTINCT c
        FROM Conversation c
        JOIN c.participants p
        WHERE p.email = :email
        ORDER BY c.createdAt DESC
    """)
    List<Conversation> findUserConversations(String email);

    Optional<Conversation> findByConversationCode(String conversationCode);

    boolean existsByConversationCode(String conversationCode);

    boolean existsByConversationCodeAndParticipantsUserId(String conversationCode, String userId);

    boolean existsByConversationCodeAndParticipantsEmail(String conversationCode, String email);

}
