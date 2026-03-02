package com.baatein.backend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.baatein.backend.dtos.chatDTOs.MessageListDTO;
import com.baatein.backend.dtos.chatDTOs.MessageRequestDTO;
import com.baatein.backend.entities.Conversation;
import com.baatein.backend.entities.Message;
import com.baatein.backend.entities.User;
import com.baatein.backend.mappers.MessageMapper;
import com.baatein.backend.repositories.ConversationRepository;
import com.baatein.backend.repositories.MessageRepository;
import com.baatein.backend.repositories.UserRepository;
import com.baatein.backend.util.CodeGenerationService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ChatService {

    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final MessageMapper messageMapper;
    private final ConversationService conversationService;
    private final CodeGenerationService codeGenerationService;

    public MessageListDTO getMessagesFromConversation(String conversationCode, String email) {
        conversationService.isPartOfConversation(conversationCode, email);

        List<Message> messages =
                messageRepository.findByConversationConversationCodeOrderByTimeStampAsc(conversationCode);

        return new MessageListDTO(messageMapper.toDTO(messages));
    }

    public void sendMessage(String email, MessageRequestDTO messageRequestDTO, String conversationId) {
        Conversation conversation = conversationRepository
                .findByConversationCode(conversationId)
                .orElseThrow(() -> new IllegalArgumentException("Conversation not found"));
    
        conversationService.isPartOfConversation(conversationId, email);

        User sender = userRepository.findByEmail(email)
                                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Message message = new Message();
        message.setConversation(conversation);
        message.setSender(sender);
        message.setMessageCode(codeGenerationService.generateUniqueMessageCode());
        message.setContent(messageRequestDTO.getContent());

        messageRepository.save(message);
    }

    public void deleteMessage(String messageCode, String email) {
        Message message = messageRepository.findByMessageCode(messageCode)
                .orElseThrow(() -> new IllegalArgumentException("Message not found"));

        if (!message.getSender().getEmail().equals(email)) {
            throw new IllegalArgumentException("Cannot delete others' messages");
        }

        messageRepository.delete(message);
    }
}