package com.baatein.backend.mappers;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.baatein.backend.dtos.conversationDTOs.ConversationDTO;
import com.baatein.backend.entities.Conversation;

@Mapper(componentModel = "spring")
public interface ConversationMapper {
    @Mapping(source = "conversationCode", target = "conversationId")
    @Mapping(target = "lastMessage", ignore = true)
    @Mapping(target = "canMessage", ignore = true)
    public ConversationDTO toDTO(Conversation conversation);
    public List<ConversationDTO> toDTO(List<Conversation> conversation);
}
