package com.baatein.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.baatein.backend.entities.User;

public interface UserRepository extends JpaRepository<User,String> {
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByFriendCode(String friendCode);

    Optional<User> findByFriendCode(String friendCode);

}
