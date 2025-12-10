package com.baatein.repository;
import com.baatein.entity.FriendRequest;
import com.baatein.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {
    List<FriendRequest> findByReceiver(User receiver);
    List<FriendRequest> findByRequester(User requester);
    Optional<FriendRequest> findByRequesterAndReceiver(User requester, User receiver);
}
