package com.baatein.backend.dtos.friendDTOs;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class FriendRequestDTO {
    private String friendshipCode;
    private String friendName;
    private String imgUrl;
}