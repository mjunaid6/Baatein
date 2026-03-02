package com.baatein.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.baatein.backend.dtos.conversationDTOs.ConversationDTO;
import com.baatein.backend.dtos.conversationDTOs.ConversationListDTO;
import com.baatein.backend.services.ConversationService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("conversation")
@AllArgsConstructor
public class ConversationController {
    private final ConversationService conversationService;

    @GetMapping("/getConversations")
    public ResponseEntity<ConversationListDTO> getConversations() {
        String email = SecurityContextHolder
                                            .getContext()
                                            .getAuthentication()
                                            .getName();

        ConversationListDTO conversations = conversationService.getConversations(email);
        return ResponseEntity
                            .status(HttpStatus.OK)
                            .body(conversations);
    }

    @GetMapping("/{friendshipCode}/getConversation")
    public ResponseEntity<ConversationDTO> getConversation(@PathVariable String friendshipCode) {
        String email = SecurityContextHolder.getContext()
                                            .getAuthentication()
                                            .getName();

        ConversationDTO conversationDTO = conversationService.getOrCreatePrivateConversation(email, friendshipCode);
        return ResponseEntity.status(HttpStatus.OK)
                                .body(conversationDTO);
    }

    @PostMapping("/{conversationCode}/leave")
    public ResponseEntity<String> leaveConversation(@PathVariable String conversationCode) {
        String email = SecurityContextHolder.getContext()
                                            .getAuthentication()
                                            .getName();

        conversationService.leaveConversation(conversationCode, email);

        return ResponseEntity.ok("Conversation left successfully");
    } 
}
