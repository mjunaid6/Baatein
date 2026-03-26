package com.baatein.backend.websocket;

import java.security.Principal;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import com.baatein.backend.dtos.chatDTOs.MessageRequestDTO;
import com.baatein.backend.services.ChatService;

import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
public class ChatWebSocketController {
    private final ChatService chatService;

    @MessageMapping("/sendMessage")
    public void sendMessage(MessageRequestDTO dto, Principal principal) {
        String email = principal.getName();

        chatService.sendMessage(email, dto);
    }

    @MessageMapping("/deleteMessage")
    public void deleteMessage(String msgId, Principal principal) {
        String email = principal.getName();

        msgId = msgId.substring(1, msgId.length()-1);
        System.out.println("Messageid received to dlete: " + " " + msgId);
        chatService.deleteMessage(msgId, email);
    }
}
