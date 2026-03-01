package com.baatein.backend.services;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.baatein.backend.dtos.userDTOs.ProfileResponseDTO;
import com.baatein.backend.entities.User;
import com.baatein.backend.repositories.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public ProfileResponseDTO getProfile(String email) {
        User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new UsernameNotFoundException("NO user with email : " + email));
        
        return new ProfileResponseDTO(
                                    user.getFriendCode(),
                                    email, 
                                    user.getImgUrl());
    }
}
