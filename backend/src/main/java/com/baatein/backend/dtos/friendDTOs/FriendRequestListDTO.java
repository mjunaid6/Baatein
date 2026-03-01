package com.baatein.backend.dtos.friendDTOs;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class FriendRequestListDTO {
    private List<FriendRequestDTO> friendRequests;
}
