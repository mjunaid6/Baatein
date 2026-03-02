package com.baatein.backend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.baatein.backend.dtos.conversationDTOs.ConversationDTO;
import com.baatein.backend.dtos.conversationDTOs.ConversationListDTO;
import com.baatein.backend.entities.Conversation;
import com.baatein.backend.entities.User;
import com.baatein.backend.repositories.ConversationRepository;
import com.baatein.backend.util.CodeGenerationService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ConversationService {
    private final ConversationRepository conversationRepository;
    private final CodeGenerationService codeGenerationService;

    public ConversationListDTO getConversations(String email) {
        List<Conversation> conversations = conversationRepository.findUserConversations(email);

        List<ConversationDTO> conversationDTOs = conversations.stream()
                            .map(conversation -> mapToDTO(conversation, email))
                            .toList();

        return new ConversationListDTO(conversationDTOs);
    }

    private ConversationDTO mapToDTO(Conversation conversation, String email) {

        ConversationDTO dto = new ConversationDTO();

        dto.setConversationId(conversation.getConversationCode());
        dto.setType(conversation.getType());

        if (conversation.getType() == Conversation.Type.PRIVATE) {

            User otherUser = conversation.getParticipants()
                    .stream()
                    .filter(user -> !user.getEmail().equals(email))
                    .findFirst()
                    .orElse(null);

            if (otherUser != null) {
                dto.setName(otherUser.getUserName());
                dto.setImgUrl(otherUser.getImgUrl());
            }

        } 
        else {
            dto.setName(conversation.getName());
            dto.setImgUrl(conversation.getImgUrl());
        }

        return dto;
    }

    public void isPartOfConversation(String conversationCode, String email) {
        if (!conversationRepository
                .existsByConversationCodeAndParticipantsEmail(conversationCode, email)) {
            throw new IllegalArgumentException("Conversation not accessible");
        }
    }

    public Conversation getOrCreatePrivateConversation(User user1, User user2) {
        return conversationRepository
                .findPrivateConversation(user1, user2)
                .orElseGet(() -> {
                    Conversation conversation = new Conversation();
                    conversation.getParticipants().add(user1);
                    conversation.getParticipants().add(user2);
                    conversation.setConversationCode(codeGenerationService.generateUniqueConversationCode());
                    conversation.setType(Conversation.Type.PRIVATE);

                    return conversationRepository.save(conversation);
                });
    }
}
