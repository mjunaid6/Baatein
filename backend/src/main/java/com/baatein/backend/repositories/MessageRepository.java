package com.baatein.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.baatein.backend.entities.Message;

public interface MessageRepository extends JpaRepository<Message,String> {
    List<Message> findByConversationConversationId(String conversationId);

    boolean existsByMessageIdAndSenderUserId(String messageId, String senderId);

    long countByMessageIdInAndSenderUserId(List<String> messageIds, String senderId);

    void deleteByMessageIdInAndSenderUserId(List<String> messageIds, String senderId);
}
