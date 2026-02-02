package com.baatein.backend.mappers;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.baatein.backend.dtos.chatDTOs.MessageDTO;
import com.baatein.backend.entities.Message;

@Mapper(componentModel = "spring")
public interface MessageMapper {
    @Mapping(source = "conversation.conversationId", target = "conversationId")
    @Mapping(source = "sender.userId", target = "senderId")
    
    MessageDTO toDTO(Message message);
    List<MessageDTO> toDTO(List<Message> message);

    Message toEntity(MessageDTO messageDTO);
    List<Message> toEntity(List<MessageDTO> messageDTO);
}