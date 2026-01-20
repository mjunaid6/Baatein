package com.baatein.backend.auth.service;

import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.baatein.backend.entities.RefreshToken;
import com.baatein.backend.entities.User;
import com.baatein.backend.repositories.RefreshTokenRepository;
import com.baatein.backend.repositories.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RefreshTokenService {

    @Value("${refresh-token.expiry}")
    private int expiry;

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    public RefreshToken creaRefreshToken(String email) throws UsernameNotFoundException{
        User user = userRepository.findByEmail(email)
                                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));
                    
        refreshTokenRepository.deleteByUser(user);

        RefreshToken refreshToken = RefreshToken.builder()
                                                .user(user)
                                                .expiry(new Date(System.currentTimeMillis() + expiry))
                                                .token(UUID.randomUUID().toString())
                                                .build();

        return refreshTokenRepository.save(refreshToken);
    }

    public boolean verifyExpiration(RefreshToken refreshToken) {
        if(refreshToken.getExpiry().before(new Date())) {
            refreshTokenRepository.delete(refreshToken);   
            return false;
        }
        return true;
    }

}
