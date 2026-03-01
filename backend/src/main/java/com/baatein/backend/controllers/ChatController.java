package com.baatein.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.baatein.backend.dtos.chatDTOs.MessageListDTO;
import com.baatein.backend.dtos.chatDTOs.MessageRequestDTO;
import com.baatein.backend.services.ChatService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("chat")
@AllArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @GetMapping("/{conversationId}/messages")
    public ResponseEntity<MessageListDTO> getChats(@PathVariable String conversationId) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        MessageListDTO messages = chatService.getMessagesFromConversation(conversationId, email);

        return ResponseEntity.ok(messages);
    }

    @PostMapping("/{conversationId}/messages")
    public ResponseEntity<Void> sendMessage(
            @PathVariable String conversationId,
            @RequestBody MessageRequestDTO dto) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        chatService.sendMessage(email, dto);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/messages/{messageId}")
    public ResponseEntity<Void> deleteMessage(
            @PathVariable String messageId) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        chatService.deleteMessage(messageId, email);

        return ResponseEntity.noContent().build();
    }
}