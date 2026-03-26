package com.baatein.backend.services;

import java.util.List;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.baatein.backend.dtos.chatDTOs.MessageDTO;
import com.baatein.backend.dtos.chatDTOs.MessageListDTO;
import com.baatein.backend.dtos.chatDTOs.MessageNotificationDTO;
import com.baatein.backend.dtos.chatDTOs.MessageRequestDTO;
import com.baatein.backend.dtos.chatDTOs.events.DeleteEvent;
import com.baatein.backend.entities.Conversation;
import com.baatein.backend.entities.Message;
import com.baatein.backend.entities.User;
import com.baatein.backend.mappers.MessageMapper;
import com.baatein.backend.repositories.ConversationRepository;
import com.baatein.backend.repositories.MessageRepository;
import com.baatein.backend.repositories.UserRepository;
import com.baatein.backend.util.CodeGenerationService;

import jakarta.transaction.Transactional;
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
    private final SimpMessagingTemplate messagingTemplate;

    public MessageListDTO getMessagesFromConversation(String conversationCode, String email) {
        conversationService.isPartOfConversation(conversationCode, email);

        List<Message> messages =
                messageRepository.findByConversationConversationCodeOrderByTimeStampAsc(conversationCode);

        return new MessageListDTO(messageMapper.toDTO(messages));
    }

    @Transactional
    public void sendMessage(String email, MessageRequestDTO messageRequestDTO) {
        Conversation conversation = conversationRepository
                .findByConversationCode(messageRequestDTO.getConversationId())
                .orElseThrow(() -> new IllegalArgumentException("Conversation not found"));
    
        conversationService.isPartOfConversation(messageRequestDTO.getConversationId(), email);

        User sender = userRepository.findByEmail(email)
                                    .orElseThrow(() -> new IllegalArgumentException("User not found"));


        if(messageRequestDTO.getContent() == null || messageRequestDTO.getContent().isEmpty()) throw new IllegalArgumentException("Message is empty");

        Message message = new Message();
        message.setConversation(conversation);
        message.setSender(sender);
        message.setMessageCode(codeGenerationService.generateUniqueMessageCode());
        message.setContent(messageRequestDTO.getContent());

        messageRepository.save(message);

        MessageDTO messageDTO = messageMapper.toDTO(message);

        messagingTemplate.convertAndSend("/topic/conversation/"+messageRequestDTO.getConversationId(), messageDTO);

        MessageNotificationDTO messageNotificationDTO = new MessageNotificationDTO(
                                                                message.getContent().substring(0,Math.min(10, message.getContent().length())), 
                                                                message.getTimeStamp(),
                                                                conversation.getConversationCode()
                                                            );

        for(User user : conversation.getParticipants()) {
            if(user.getEmail().equals(email)) continue;
            messagingTemplate.convertAndSendToUser(user.getEmail(), "/queue/notifications", messageNotificationDTO);
        }
        
    }

    @Transactional
    public void deleteMessage(String messageCode, String email) {
        Message message = messageRepository.findByMessageCode(messageCode)
                .orElseThrow(() -> new IllegalArgumentException("Message not found"));

        String conversationId = message.getConversation().getConversationCode();

        conversationService.isPartOfConversation(conversationId, email);

        if (!message.getSender().getEmail().equals(email)) {
            throw new IllegalArgumentException("Cannot delete others' messages");
        }

        messageRepository.delete(message);

        messagingTemplate.convertAndSend(
            "/topic/conversation/" + conversationId,
            new DeleteEvent("DELETE", messageCode)
        );
    }
}