package com.baatein.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.baatein.backend.entities.FriendRequest;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, String> {
    List<FriendRequest> findByReceiverUserId(String receiverUserId);
    List<FriendRequest> findByReceiverUserIdAndStatus(String receiverUserId, FriendRequest.Status status);
}
