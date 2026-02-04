package com.baatein.backend.services;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import com.baatein.backend.dtos.chatDTOs.MessageDTO;
import com.baatein.backend.entities.Message;
import com.baatein.backend.mappers.MessageMapper;
import com.baatein.backend.repositories.ConversationRepository;
import com.baatein.backend.repositories.MessageRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ChatService {
    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;
    private final MessageMapper messageMapper;
    private final MessageService messageService;

    public List<MessageDTO> getMessagesFromConversation(String conversationId, String email) {
        if(!conversationRepository.existsByConversationIdAndParticipantsEmail(conversationId, email)) throw new ResourceAccessException("Conversation Not found  with conversation Id: " + conversationId);

        List<Message> messages = messageRepository.findByConversationConversationId(conversationId);
        return messageMapper.toDTO(messages);
    }

    public boolean putMessage(MessageDTO messageDTO) {
        if (messageDTO == null ||
            messageDTO.getConversationId() == null ||
            messageDTO.getSenderId() == null ||
            !conversationRepository.existsByConversationIdAndParticipantsUserId(
                messageDTO.getConversationId(), 
                messageDTO.getSenderId()
            )
        )  return false;

        Message message = messageService.toEntity(messageDTO);
        message.setMessageId(UUID.randomUUID().toString());

        messageRepository.save(message);
        return true;
    }

    public boolean deleteMessage(MessageDTO messageDTO) {

        if (messageDTO == null ||
            messageDTO.getMessageId() == null ||
            messageDTO.getConversationId() == null ||
            messageDTO.getSenderId() == null ||
            !conversationRepository.existsByConversationIdAndParticipantsUserId(
                messageDTO.getConversationId(),
                messageDTO.getSenderId()
            ) ||
            !messageRepository.existsByMessageIdAndSenderUserId(messageDTO.getMessageId(), messageDTO.getSenderId())
        ) return false;

        messageRepository.deleteById(messageDTO.getMessageId());
        return true;
    }


    public boolean deleteMessage(List<MessageDTO> messageDTOs) {

        if (messageDTOs == null || messageDTOs.isEmpty())
            return false;

        MessageDTO first = messageDTOs.get(0);

        if (first.getConversationId() == null ||
            first.getSenderId() == null ||
            !conversationRepository.existsByConversationIdAndParticipantsUserId(
                first.getConversationId(),
                first.getSenderId()
            )
        ) return false;

        boolean sameConversationAndSender = messageDTOs.stream()
                .allMatch(m ->
                    first.getConversationId().equals(m.getConversationId()) &&
                    first.getSenderId().equals(m.getSenderId())
                );

        if (!sameConversationAndSender) return false;

        List<String> messageIds = messageDTOs.stream()
                .map(MessageDTO::getMessageId)
                .toList();

        long count = messageRepository
                .countByMessageIdInAndSenderUserId(messageIds, first.getSenderId());

        if (count != messageIds.size()) return false;

        messageRepository.deleteByMessageIdInAndSenderUserId(
                messageIds,
                first.getSenderId()
        );

        return true;
    }

}
