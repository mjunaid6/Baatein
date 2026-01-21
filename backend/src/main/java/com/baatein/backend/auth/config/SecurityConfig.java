package com.baatein.backend.auth.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.baatein.backend.auth.service.AuthUserDetailsService;

import lombok.AllArgsConstructor;

@Configuration
@EnableMethodSecurity
@AllArgsConstructor
public class SecurityConfig {
    
    private final PasswordEncoder passwordEncoder;
    private final AuthUserDetailsService authUserDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http,
                                                   JWTAuthFilter jwtAuthFilter) 
                                                   throws Exception{

            return http
                       .csrf(AbstractHttpConfigurer::disable)
                       .cors(Customizer.withDefaults())
                       .sessionManagement(sess -> 
                                sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                       )    
                       .authorizeHttpRequests(auth -> 
                            auth.requestMatchers(
                                "/auth/signup",
                                "/auth/login",
                                "/auth/refresh-token"
                            ).permitAll()
                            .anyRequest()
                            .authenticated()
                       )
                       .authenticationProvider(authenticationProvider())
                       .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                       .build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authP = new DaoAuthenticationProvider(authUserDetailsService);
        authP.setPasswordEncoder(passwordEncoder);
        return authP;
    }

    @Bean
    public AuthenticationManager authenticationManager(
        AuthenticationConfiguration authenticationConfiguration) throws Exception {
            return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(List.of("http://localhost:5173"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true); 

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
