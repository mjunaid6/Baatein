package com.baatein.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
public class Message {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long conversationId;
    private Long senderId;
    private Long receiverId;
    @Column(columnDefinition = "TEXT")
    private String content;
    private String contentType = "TEXT";
    private String status = "SENT";
    private LocalDateTime createdAt = LocalDateTime.now();

    public Message(){}

    public Long getId(){return id;}
    public void setId(Long id){this.id=id;}
    public Long getConversationId(){return conversationId;}
    public void setConversationId(Long conversationId){this.conversationId=conversationId;}
    public Long getSenderId(){return senderId;}
    public void setSenderId(Long senderId){this.senderId=senderId;}
    public Long getReceiverId(){return receiverId;}
    public void setReceiverId(Long receiverId){this.receiverId=receiverId;}
    public String getContent(){return content;}
    public void setContent(String content){this.content=content;}
    public String getContentType(){return contentType;}
    public void setContentType(String contentType){this.contentType=contentType;}
    public String getStatus(){return status;}
    public void setStatus(String status){this.status=status;}
    public LocalDateTime getCreatedAt(){return createdAt;}
    public void setCreatedAt(LocalDateTime createdAt){this.createdAt=createdAt;}
}
