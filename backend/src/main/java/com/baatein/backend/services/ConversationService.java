package com.baatein.backend.services;

import java.util.HashSet;
import java.util.List;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import com.baatein.backend.dtos.conversationDTOs.ConversationDTO;
import com.baatein.backend.dtos.conversationDTOs.ConversationListDTO;
import com.baatein.backend.entities.Conversation;
import com.baatein.backend.entities.Friendship;
import com.baatein.backend.entities.User;
import com.baatein.backend.repositories.ConversationRepository;
import com.baatein.backend.repositories.FriendshipRepository;
import com.baatein.backend.repositories.UserRepository;
import com.baatein.backend.util.CodeGenerationService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ConversationService {
    private final ConversationRepository conversationRepository;
    private final CodeGenerationService codeGenerationService;
    private final UserRepository userRepository;
    private final FriendshipRepository friendshipRepository;

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
                .existsByConversationCodeAndParticipantEmail(conversationCode, email)) {
            throw new IllegalArgumentException("Conversation not accessible");
        }
    }

    public ConversationDTO getOrCreatePrivateConversation(String email, String friendshipCode) {
        Friendship friendship = friendshipRepository.findByFriendshipCode(friendshipCode)
                                                    .orElseThrow(() -> new EntityNotFoundException("Friendship not found"));

        User user = friendship.getUser();
        User friend = friendship.getFriend();

        if(!user.getEmail().equals(email) && !friend.getEmail().equals(email)) throw new AccessDeniedException("Cannot access conversation");

        return mapToDTO(getOrCreatePrivateConversation(user, friend), email);
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
                    conversation.setMessages(new HashSet<>());

                    return conversationRepository.save(conversation);
                });
    }

    @Transactional
    public void leaveConversation(String conversationId, String email) {

        Conversation conversation = conversationRepository
                .findByConversationCode(conversationId)
                .orElseThrow(() -> new EntityNotFoundException("Conversation not found"));

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        if (!conversation.getParticipants().contains(user))
            throw new IllegalStateException("User is not part of this conversation");

        conversation.getParticipants().remove(user);
        user.getConversations().remove(conversation);

        if (conversation.getParticipants().isEmpty()) {
            conversationRepository.delete(conversation);
        }
    }

    public void leaveConversationUsingFriendShip(User user, User friend) {
        Conversation conversation = conversationRepository
                .findPrivateConversation(user, friend)
                .orElseThrow(() -> new EntityNotFoundException("Conversation not found"));

        conversation.getParticipants().remove(user);
        user.getConversations().remove(conversation);

        if (conversation.getParticipants().isEmpty()) {
            conversationRepository.delete(conversation);
        }
    }

}
