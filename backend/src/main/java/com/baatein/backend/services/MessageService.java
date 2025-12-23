package com.baatein.backend.services;

import java.time.LocalDateTime;
import java.util.List;

import com.baatein.backend.entities.Message;
import com.baatein.backend.repositories.MessageRepository;

public class MessageService {
    private MessageRepository messageRepository;
    
    public Message sendMesage(Message message) {
        message.setTimeStamp(LocalDateTime.now());
        return messageRepository.save(message);
    }

    public List<Message> getMessages(String conversationId) {
        return messageRepository.findConversationById(conversationId);
    }

}
