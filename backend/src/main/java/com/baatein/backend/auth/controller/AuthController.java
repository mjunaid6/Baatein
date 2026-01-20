package com.baatein.backend.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.baatein.backend.auth.config.JWTAuthFilter;
import com.baatein.backend.auth.service.AuthUserDetailsService;
import com.baatein.backend.auth.service.JWTService;
import com.baatein.backend.auth.service.RefreshTokenService;
import com.baatein.backend.dtos.AuthResponseDTO;
import com.baatein.backend.dtos.SignUpDTO;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {
    
    private final AuthUserDetailsService authUserDetailsService;
    private final JWTService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponseDTO> signUp(@RequestBody SignUpDTO signUpDTO) {
        String refreshToken = refreshTokenService.s
    }
}
