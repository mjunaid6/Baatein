package com.baatein.backend.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.baatein.backend.dtos.friendDTOs.FriendDTO;
import com.baatein.backend.dtos.friendDTOs.FriendRequestDTO;
import com.baatein.backend.entities.Friendship;
import com.baatein.backend.entities.User;
import com.baatein.backend.repositories.FriendshipRepository;
import com.baatein.backend.repositories.UserRepository;
import com.baatein.backend.util.CodeGenerationService;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class FriendService {
    private final FriendshipRepository friendshipRepository;
    private final UserRepository userRepository;
    private final CodeGenerationService codeGenerationService;

    public List<FriendDTO> getFriendsUsingEmail(String email) {
        if(email == null) return new ArrayList<>();

        List<Friendship> friendships = friendshipRepository.getFriendshipsFromEmail(email);

        List<FriendDTO> friends = new ArrayList<>();
        for(Friendship friendship : friendships) {
            User user = friendship.getUser();
            User friend = friendship.getFriend();
            if(user.getEmail().equals(email)) friends.add(new FriendDTO(friendship.getFriendshipCode(), friend.getUserName(), friend.getImgUrl()));
            else friends.add(new FriendDTO(friendship.getFriendshipCode(), user.getUserName(), user.getImgUrl()));
        }

        return friends;
    }

    public List<FriendRequestDTO> getFriendRequestsUsingEmail(String email) {
        if(email == null) return new ArrayList<>();

        List<Friendship> friendships = friendshipRepository.getFriendRequetsFromEmail(email);

        List<FriendRequestDTO> friendRequests = new ArrayList<>();
        for(Friendship friendship : friendships) {
            User user = friendship.getUser();
            friendRequests.add(new FriendRequestDTO(friendship.getFriendshipCode(), user.getUserName(), user.getImgUrl()));
        }

        return friendRequests;
    }

    public void addFriend(String friendCode, String userEmail) {
        User user = userRepository
                                .findByEmail(userEmail)
                                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        User friend = userRepository
                                .findByFriendCode(friendCode)
                                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if(friendshipRepository.existsByUserAndFriend(user, friend)) return;
        
        Friendship friendship = new Friendship(
                                                UUID.randomUUID().toString(),
                                                user, 
                                                friend, 
                                                codeGenerationService.generateUniqueFriendshipCode(),
                                                Friendship.Status.PENDING, 
                                                null,
                                                LocalDateTime.now());

        friendshipRepository.save(friendship);
    }

    public void deleteFriend(String userEmail, String friendshipCode) {
        Friendship friendship = friendshipRepository
                                                    .findByFriendshipCode(friendshipCode)
                                                    .orElseThrow(() -> new EntityNotFoundException("Friendship not found"));

        friendship.getUser().getFriends().remove(friendship);
        friendship.getFriend().getFriends().remove(friendship);

        friendshipRepository.delete(friendship);
    }

    public void acceptRequest(String email, String friendshipCode) {
        Friendship friendship = friendshipRepository
                                                    .findByFriendshipCode(friendshipCode)
                                                    .orElseThrow(() -> new EntityNotFoundException("Friendship not found"));
                                   
        if (!friendship.getFriend().getEmail().equals(email)) throw new AccessDeniedException("You cannot accept this request");

        if (friendship.getStatus() != Friendship.Status.PENDING) throw new IllegalStateException("Request is not pending");

        User user = friendship.getUser();
        User friend = friendship.getFriend();
        
        if(friendshipRepository.existsByUserAndFriend(user, friend)) {
            friendshipRepository.delete(friendship);
            return;
        }
        
        friendship.setStatus(Friendship.Status.FRIENDS);
        friendshipRepository.save(friendship);
    }

    public void rejectRequest(String friendshipCode) {
        Friendship friendship = friendshipRepository
                                                    .findByFriendshipCode(friendshipCode)
                                                    .orElseThrow(() -> new EntityNotFoundException("Friendship not found"));
                                        
        friendship.getUser().getFriends().remove(friendship);

        friendshipRepository.delete(friendship);
    }

    public void blockFriend(String userEmail, String friendshipCode) {
        Friendship friendship = friendshipRepository
                                                    .findByFriendshipCode(friendshipCode)
                                                    .orElseThrow(() -> new EntityNotFoundException("Friendship not found"));

        User user = userRepository
                                .findByEmail(userEmail)
                                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        
        friendship.setStatus(Friendship.Status.BLOCKED);
        friendship.setBlockedBy(user);

        friendshipRepository.save(friendship);
    }

    public void unBlockFriend(String userEmail, String friendshipCode) {
        Friendship friendship = friendshipRepository
                                                    .findByFriendshipCode(friendshipCode)
                                                    .orElseThrow(() -> new EntityNotFoundException("Friendship not found"));
        
        if(friendship.getBlockedBy().getEmail() != userEmail) throw new AccessDeniedException("User cannot unblock");

        friendship.setStatus(Friendship.Status.FRIENDS);
        friendship.setBlockedBy(null);

        friendshipRepository.save(friendship);
    }
}
