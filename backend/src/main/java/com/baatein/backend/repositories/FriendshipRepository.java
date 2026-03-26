package com.baatein.backend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.baatein.backend.entities.Friendship;
import com.baatein.backend.entities.User;

public interface FriendshipRepository extends JpaRepository<Friendship,String> {
    
    @Query("""
        SELECT f
        FROM Friendship f
        WHERE f.status != com.baatein.backend.entities.Friendship.Status.PENDING
        AND (f.user.email = :email OR f.friend.email = :email)
    """)
    List<Friendship> getFriendshipsFromEmail(String email);

    @Query("""
        SELECT f
        FROM Friendship f
        WHERE f.status = com.baatein.backend.entities.Friendship.Status.PENDING
        AND f.friend.email = :email
    """)
    List<Friendship> getFriendRequetsFromEmail(String email);

    boolean existsByFriendshipCode(String friendshipCode);

    Optional<Friendship> findByFriendshipCode(String friendshipCode);

    @Query("""
        SELECT COUNT(f) > 0
        FROM Friendship f
        WHERE 
            (f.user = :user1 AND f.friend = :user2)
            OR
            (f.user = :user2 AND f.friend = :user1)
    """)
    boolean existsBetweenUsers(User user1, User user2);

    @Query("""
        SELECT COUNT(f) > 0
        FROM Friendship f
        WHERE 
            ((f.user = :user1 AND f.friend = :user2)
            OR
            (f.user = :user2 AND f.friend = :user1))
            AND
            f.status = com.baatein.backend.entities.Friendship.Status.BLOCKED
    """)
    boolean isFriendshipBlocked(User user1, User user2);
}
