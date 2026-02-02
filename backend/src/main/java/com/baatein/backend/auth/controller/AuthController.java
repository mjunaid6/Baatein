package com.baatein.backend.auth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.baatein.backend.auth.config.CookieUtil;
import com.baatein.backend.auth.service.AuthUserDetailsService;
import com.baatein.backend.auth.service.JWTService;
import com.baatein.backend.auth.service.RefreshTokenService;
import com.baatein.backend.dtos.authDTOs.AuthResponseDTO;
import com.baatein.backend.dtos.authDTOs.SignUpDTO;
import com.baatein.backend.dtos.authDTOs.UserLoginDto;
import com.baatein.backend.entities.RefreshToken;

import jakarta.servlet.http.HttpServletResponse;
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
    public ResponseEntity<AuthResponseDTO> signUp(@RequestBody SignUpDTO signUpDTO, HttpServletResponse response) {
        String refreshToken = authUserDetailsService.signup(signUpDTO);

        if(refreshToken == null) {
            return ResponseEntity
                                .status(HttpStatus.CONFLICT)
                                .build();
        }

        CookieUtil.addRefreshCookie(response, refreshToken);

        return ResponseEntity
                            .status(HttpStatus.CREATED)
                            .body(new AuthResponseDTO(
                                jwtService.createToken(signUpDTO.getEmail()),
                                ""
                            ));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody UserLoginDto userLoginDto, HttpServletResponse response) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                                            userLoginDto.getEmail(), 
                                            userLoginDto.getPassword()
                )
        );

        CookieUtil.addRefreshCookie(response, refreshTokenService.createRefreshToken(userLoginDto.getEmail()));

        return ResponseEntity
                            .status(HttpStatus.OK)
                            .body(new AuthResponseDTO(
                                jwtService.createToken(userLoginDto.getEmail()),
                                ""
                            ));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthResponseDTO> refreshToken(
            @CookieValue(name = "refresh_token", required = false) String refreshToken,
            HttpServletResponse response
    ) {
        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        RefreshToken token = refreshTokenService.findRefreshToken(refreshToken);

        if (!refreshTokenService.verifyExpiration(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        CookieUtil.addRefreshCookie(response, token.getToken());

        return ResponseEntity.ok(
                new AuthResponseDTO(
                        jwtService.createToken(token.getUser().getEmail()),
                        ""
                )
        );
    }


    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        CookieUtil.deleteRefreshToken(response);
        return ResponseEntity.ok().build();
    }

}
