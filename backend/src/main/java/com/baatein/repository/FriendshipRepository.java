package com.baatein.repository;
import com.baatein.entity.Friendship;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface FriendshipRepository extends JpaRepository<Friendship, Long> {
    Optional<Friendship> findByUser1AndUser2(Long user1, Long user2);
    List<Friendship> findByUser1OrUser2(Long user1, Long user2);
}
