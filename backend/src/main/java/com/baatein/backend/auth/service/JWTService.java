package com.baatein.backend.auth.service;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
@Configuration
@ConfigurationProperties(prefix = "jwt")
public class JWTService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiry}")
    private long expiry;

    public String createToken(String email) {
        return Jwts.builder()
                    .setSubject(email)
                    .setIssuedAt(new Date(System.currentTimeMillis()))
                    .setExpiration(new Date(System.currentTimeMillis() + expiry))
                    .signWith(getSignKey() ,SignatureAlgorithm.HS256)
                    .compact();
    }

    public String extractEmail(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String email = extractEmail(token);
        return (email.equals(userDetails.getUsername()) && !isTokenExpired(token)); 
    }

    private  boolean isTokenExpired(String token) {
        return extractExpiry(token).before(new Date());
    }

    private Date extractExpiry(String token) {
        return extractClaims(token, Claims::getExpiration);
    }

    private  <T> T extractClaims(String token, Function<Claims, T> claimresolver){
        final Claims claims = extractAllClaims(token);
        return claimresolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                    .setSigningKey(getSignKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
    }

    private Key getSignKey() {
        byte[] key = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(key);
    }
}
