package com.baatein.repository;
import com.baatein.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByPublicCode(String publicCode);
    boolean existsByPublicCode(String publicCode);
}
