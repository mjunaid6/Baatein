package com.baatein.backend.services;

import org.springframework.stereotype.Service;

import com.baatein.backend.dtos.chatDTOs.MessageDTO;
import com.baatein.backend.entities.Conversation;
import com.baatein.backend.entities.Message;
import com.baatein.backend.entities.User;
import com.baatein.backend.repositories.ConversationRepository;
import com.baatein.backend.repositories.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MessageService {

    private ConversationRepository conversationRepository;
    private UserRepository userRepository;

    public Message toEntity(MessageDTO dto) {
        Conversation conversation = conversationRepository
                .findById(dto.getConversationId())
                .orElseThrow(() -> new EntityNotFoundException("Conversation not found"));

        User sender = userRepository
                .findById(dto.getSenderId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Message message = new Message();
        message.setContent(dto.getContent());
        message.setConversation(conversation);
        message.setSender(sender);

        return message;
    }

}
