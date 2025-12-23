package com.baatein.backend.dtos;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageDTO {
    private String messageId;
    private String conversationId; 
    private String senderId;
    private String content;
    private LocalDateTime timestamp;

    public MessageDTO() {}
}
