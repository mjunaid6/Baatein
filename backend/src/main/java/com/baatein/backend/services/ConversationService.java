package com.baatein.backend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.baatein.backend.dtos.conversationDTOs.ConversationListDTO;
import com.baatein.backend.entities.Conversation;
import com.baatein.backend.entities.User;
import com.baatein.backend.mappers.ConversationMapper;
import com.baatein.backend.repositories.ConversationRepository;
import com.baatein.backend.util.CodeGenerationService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ConversationService {
    private final ConversationRepository conversationRepository;
    private final ConversationMapper conversationMapper;
    private final CodeGenerationService codeGenerationService;

    public ConversationListDTO getConversations(String email) {
        List<Conversation> conversations = conversationRepository.findUserConversations(email);

        return new ConversationListDTO(conversationMapper.toDTO(conversations));
    }

    public void isPartOfConversation(String conversationCode, String email) {
        if (!conversationRepository
                .existsByConversationCodeAndParticipantsEmail(conversationCode, email)) {
            throw new IllegalArgumentException("Conversation not accessible");
        }
    }

    public Conversation createPrivateConversation(User user1, User user2) {
        Conversation conversation = new Conversation();
        conversation.getParticipants().add(user1);
        conversation.getParticipants().add(user2);
        conversation.setConversationCode(codeGenerationService.generateUniqueConversationCode());
        conversation.setType(Conversation.Type.PRIVATE);

        conversationRepository.save(conversation);
        return conversation;
    }
}
