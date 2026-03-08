package com.baatein.backend.dtos.userDTOs;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UpdateProfilePicDTO {
    private MultipartFile image;
}
