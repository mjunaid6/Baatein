package com.baatein.backend.auth.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.baatein.backend.entities.Role;
import com.baatein.backend.entities.User;

public class AuthUserDetails extends User implements UserDetails {

    private String email;

    private String password;

    private Collection<? extends GrantedAuthority> authorities;

    public AuthUserDetails(User user) {
        this.email = user.getEmail();
        this.password = user.getPassword();

        List<GrantedAuthority> auth = new ArrayList<>();

        for(Role role : user.getRoles()) {
            auth.add(new SimpleGrantedAuthority(role.getRoleName().toUpperCase()));
        }

        this.authorities = auth;
    }
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() { return authorities; }

    @Override
    public String getPassword() { return password; }

    @Override
    public String getUsername() { return email; }

}
