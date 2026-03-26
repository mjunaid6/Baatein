package com.baatein.backend.dtos.conversationDTOs;

import com.baatein.backend.entities.Conversation;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class ConversationDTO {
    private String conversationId;
    private Conversation.Type type;
    private String name;
    private String imgUrl;
    private String lastMessage = "";
}
