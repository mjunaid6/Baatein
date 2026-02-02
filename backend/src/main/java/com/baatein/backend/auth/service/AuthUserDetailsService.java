package com.baatein.backend.auth.service;

import java.util.HashSet;
import java.util.UUID;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.baatein.backend.dtos.authDTOs.SignUpDTO;
import com.baatein.backend.entities.User;
import com.baatein.backend.repositories.UserRepository;
import com.baatein.backend.util.CodeGeneration;
import com.baatein.backend.util.ValidationUtil;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenService refreshTokenService;

    public String signup(SignUpDTO signUpDTO) {
        if(ValidationUtil.isUserValid(signUpDTO)) return null;

        if(userRepository.existsByEmail(signUpDTO.getEmail())) return null;

        User user = new User(UUID.randomUUID().toString(), 
                            signUpDTO.getUsername(), 
                            signUpDTO.getEmail(), 
                            passwordEncoder.encode(signUpDTO.getPassword()),
                            CodeGeneration.generateUniqueFriendCode(),
                            null, 
                            new HashSet<>(), 
                            null, 
                            new HashSet<>());

        userRepository.save(user);

        return refreshTokenService.createRefreshToken(signUpDTO.getEmail());

    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                                  .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return new AuthUserDetails(user);
    }

}
