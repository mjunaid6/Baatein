package com.baatein.backend.controllers;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.baatein.backend.dtos.userDTOs.ProfileResponseDTO;
import com.baatein.backend.dtos.userDTOs.UpdateProfilePicDTO;
import com.baatein.backend.services.UserService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("user")
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/getProfile")
    public ResponseEntity<ProfileResponseDTO> getProfile() {
        String email = SecurityContextHolder
                                            .getContext()
                                            .getAuthentication()
                                            .getName();

        ProfileResponseDTO profile = userService.getProfile(email);
        return ResponseEntity
                            .status(HttpStatus.OK)
                            .body(profile);
    }

    @PostMapping("/updateProfilePicture")
    public ResponseEntity<Map<String,String>> uploadProfilePicture(UpdateProfilePicDTO dto) {
        String email = SecurityContextHolder
                                                .getContext()
                                                .getAuthentication()
                                                .getName();
                                                
        String imgUrl = userService.updateProfilePic(email, dto.getImage());

        return ResponseEntity.ok(Map.of("imgUrl", imgUrl));
    }
}
