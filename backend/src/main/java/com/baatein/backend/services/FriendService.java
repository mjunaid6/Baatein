package com.baatein.backend.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.baatein.backend.dtos.friendDTOs.FriendDTO;
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
        if(email == null) return null;

        List<Friendship> friendships = friendshipRepository.getFriendshipsFromEmail(email);

        List<FriendDTO> friends = new ArrayList<>();
        for(Friendship friendship : friendships) {
            User user = friendship.getUser();
            User friend = friendship.getFriend();
            if(user.getEmail() == email) friends.add(new FriendDTO(user.getUserName(), user.getImgUrl()));
            else friends.add(new FriendDTO(friend.getUserName(), friend.getImgUrl()));
        }

        return friends;
    }

    public void addFriend(String userEmail, String friendCode) {
        User user = userRepository
                                .findByEmail(userEmail)
                                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        User friend = userRepository
                                .findByFriendCode(friendCode)
                                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        
        Friendship friendship = new Friendship(
                                                UUID.randomUUID().toString(),
                                                user, 
                                                friend, 
                                                codeGenerationService.generateUniqueFriendshipCode(),
                                                Friendship.Status.PENDING, 
                                                null,
                                                LocalDateTime.now());

        friendshipRepository.save(friendship);

        user.getFriends().add(friendship);

        userRepository.save(user);
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
                                        
        friendship.setStatus(Friendship.Status.FRIENDS);
        friendshipRepository.save(friendship);

        User user = userRepository
                                .findByEmail(email)
                                .orElseThrow(() -> new UsernameNotFoundException("User not found with email : " + email));

        user.getFriends().remove(friendship);

        userRepository.save(user);
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
