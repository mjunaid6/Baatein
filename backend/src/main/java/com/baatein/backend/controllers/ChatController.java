package com.baatein.backend.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.baatein.backend.dtos.ChatRequestDTO;
import com.baatein.backend.dtos.ChatResponeDTO;
import com.baatein.backend.dtos.MessageDTO;
import com.baatein.backend.services.ChatService;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@RestController
@RequestMapping("chat")
@Getter
@Setter
@AllArgsConstructor
public class ChatController {

    private final ChatService chatService;
    
    @GetMapping("/getMessages")
    public ResponseEntity<ChatResponeDTO> getChats(@RequestBody ChatRequestDTO chatRequestDTO) {
        List<MessageDTO> messages = chatService.getMessagesFromConversation(chatRequestDTO.getConversationId());

        return ResponseEntity.
                              status(HttpStatus.OK)
                              .body(new ChatResponeDTO(messages));
    }

    @PutMapping("/putMessage") 
    public ResponseEntity<String> putMessage(@RequestBody MessageDTO messageDTO) {
        if(!chatService.putMessage(messageDTO)) return ResponseEntity
                                                                    .status(HttpStatus.FORBIDDEN)
                                                                    .body("Error in adding message");

        return ResponseEntity
                            .status(HttpStatus.ACCEPTED)
                            .body("Message Added Successfully");
    }

    @DeleteMapping("/deleteMessage")
    public ResponseEntity<String> deleteMessage(@RequestBody MessageDTO messageDTO) {
        if(!chatService.deleteMessage(messageDTO)) return ResponseEntity
                                                                        .status(HttpStatus.FORBIDDEN)
                                                                        .body("Cannot Delete message");
    
        return ResponseEntity
                            .status(HttpStatus.ACCEPTED)
                            .body("Message Deleted");
    }

    @DeleteMapping("/deleteMessages")
    public ResponseEntity<String> deleteMessages(@RequestBody List<MessageDTO> messages) {
        if(!chatService.deleteMessage(messages)) return ResponseEntity
                                                                        .status(HttpStatus.FORBIDDEN)
                                                                        .body("Cannot Delete message");
    
        return ResponseEntity
                            .status(HttpStatus.ACCEPTED)
                            .body("Message Deleted");
    }

    
}
