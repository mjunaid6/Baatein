package com.baatein.backend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.baatein.backend.entities.Friendship;

public interface FriendshipRepository extends JpaRepository<Friendship,String> {
    
    @Query("""
            SELECT * 
            FROM Friendship f
            WHERE f.status = 'FRIENDS'
                AND (f.user.email =: email || f.friend.email =: email)
    """)
    List<Friendship> getFriendshipsFromEmail(String email);

    boolean existsByFriendshipCode(String friendshipCode);

    Optional<Friendship> findByFriendshipCode(String friendshipCode);
}
