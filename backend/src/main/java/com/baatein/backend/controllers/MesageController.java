package com.baatein.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.baatein.backend.entities.Message;
import com.baatein.backend.services.MessageService;

@RestController
@CrossOrigin
@RequestMapping("/api/messages")
public class MesageController {
    @Autowired
    private MessageService messageService;

    @PostMapping
    public Message sendMesage(@RequestBody Message message) {
        return messageService.sendMesage(message);
    }

    @GetMapping("/{conversationId}")
    public List<Message> getMessages(@PathVariable String conversationId) {
        return messageService.getMessages(conversationId);
    }
}
