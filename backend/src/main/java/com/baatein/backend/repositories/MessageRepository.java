package com.baatein.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.baatein.backend.entities.Message;

public interface MessageRepository extends JpaRepository<Message,String> {
    List<Message> findConversationById(String conversationId);
}
