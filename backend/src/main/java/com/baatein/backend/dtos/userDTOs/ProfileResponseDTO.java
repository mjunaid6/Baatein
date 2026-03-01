package com.baatein.backend.dtos.userDTOs;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProfileResponseDTO {
    private String userId;
    private String email;
    private String imgUrl;
}
