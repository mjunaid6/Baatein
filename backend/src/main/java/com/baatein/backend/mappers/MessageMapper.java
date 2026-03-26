package com.baatein.backend.mappers;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.baatein.backend.dtos.chatDTOs.MessageDTO;
import com.baatein.backend.entities.Message;

@Mapper(componentModel = "spring")
public interface MessageMapper {
    @Mapping(source = "sender.friendCode", target = "senderId")
    @Mapping(source = "messageCode", target = "messageId")
    
    @Mapping(target = "type", constant = "MESSAGE")
    MessageDTO toDTO(Message message);
    List<MessageDTO> toDTO(List<Message> message);
}