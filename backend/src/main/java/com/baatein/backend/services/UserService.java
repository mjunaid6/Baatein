package com.baatein.backend.services;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.baatein.backend.dtos.userDTOs.ProfileResponseDTO;
import com.baatein.backend.entities.User;
import com.baatein.backend.repositories.UserRepository;

import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final ProfilePicStorageService profilePicStorageService;

    public ProfileResponseDTO getProfile(String email) {
        User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new UsernameNotFoundException("NO user with email : " + email));
        
        return new ProfileResponseDTO(
                                    user.getFriendCode(),
                                    email, 
                                    user.getImgUrl());
    }

    public String updateProfilePic(String email, MultipartFile image) {
        User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new UsernameNotFoundException("No user with email : " + email));

        String newPath = profilePicStorageService.store(image).trim();

        if(newPath.equals("")) throw new RuntimeException("Failed to update pic");

        user.setImgUrl(newPath);
        userRepository.save(user);

        return newPath;
    }
}
