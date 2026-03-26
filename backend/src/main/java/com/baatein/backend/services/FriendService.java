package com.baatein.backend.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.baatein.backend.dtos.NotificationDTO;
import com.baatein.backend.dtos.friendDTOs.FriendDTO;
import com.baatein.backend.dtos.friendDTOs.FriendRequestDTO;
import com.baatein.backend.entities.Conversation;
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
    private final ConversationService conversationService;
    private final SimpMessagingTemplate messagingTemplate;

    public List<FriendDTO> getFriendsUsingEmail(String email) {
        if(email == null) return new ArrayList<>();

        List<Friendship> friendships = friendshipRepository.getFriendshipsFromEmail(email);

        List<FriendDTO> friends = new ArrayList<>();
        for(Friendship friendship : friendships) {
            User user = friendship.getUser();
            User friend = friendship.getFriend();
            String isBlocked = friendship.getStatus().name().equals("BLOCKED") ? "blocked" : "unblocked";
            if(user.getEmail().equals(email)) friends.add(new FriendDTO(friendship.getFriendshipCode(), friend.getUserName(), friend.getImgUrl(), isBlocked));
            else friends.add(new FriendDTO(friendship.getFriendshipCode(), user.getUserName(), user.getImgUrl(), isBlocked));
        }

        return friends;
    }

    public List<FriendRequestDTO> getFriendRequestsUsingEmail(String email) {
        List<Friendship> friendships = friendshipRepository.getFriendRequetsFromEmail(email);

        List<FriendRequestDTO> friendRequests = new ArrayList<>();
        for(Friendship friendship : friendships) {
            User user = friendship.getUser();
            friendRequests.add(new FriendRequestDTO(friendship.getFriendshipCode(), user.getUserName(), user.getImgUrl()));
        }

        return friendRequests;
    }

    public boolean isBlockedFriendship(User user1, User user2) {
        return friendshipRepository.isFriendshipBlocked(user1, user2);
    }

    public boolean areFriends(User user1, User user2) {
        return friendshipRepository.existsBetweenUsers(user1, user2);
    }

    public void addFriend(String friendCode, String userEmail) {
        User user = userRepository
                                .findByEmail(userEmail)
                                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        User friend = userRepository
                                .findByFriendCode(friendCode)
                                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if(friendshipRepository.existsBetweenUsers(user, friend)) return;
        
        Friendship friendship = new Friendship(
                                                UUID.randomUUID().toString(),
                                                user, 
                                                friend, 
                                                codeGenerationService.generateUniqueFriendshipCode(),
                                                Friendship.Status.PENDING, 
                                                null,
                                                LocalDateTime.now());

        friendshipRepository.save(friendship);

        messagingTemplate.convertAndSendToUser(
                                        friend.getEmail(),
                                        "/queue/notifications",
                                        new NotificationDTO<FriendRequestDTO>(
                                            "FRIEND REQUEST",
                                            new FriendRequestDTO(
                                                            friendship.getFriendshipCode(), 
                                                            user.getUserName(), 
                                                            user.getImgUrl()
                                            ),
                                            LocalDateTime.now()
                                        )
        );
    }

    public void deleteFriend(String userEmail, String friendshipCode) {
        Friendship friendship = friendshipRepository
                                                    .findByFriendshipCode(friendshipCode)
                                                    .orElseThrow(() -> new EntityNotFoundException("Friendship not found"));

        if (!friendship.getUser().getEmail().equals(userEmail) &&
            !friendship.getFriend().getEmail().equals(userEmail))  throw new AccessDeniedException("Not allowed");

        if (friendship.getStatus() == Friendship.Status.PENDING) throw new AccessDeniedException("Friendship still pending.");

        User friend = null;
        if(friendship.getUser().getEmail().equals(userEmail)) friend = friendship.getFriend();
        else friend = friendship.getUser();
    
        friendship.getUser().getFriends().remove(friendship);
        friendship.getFriend().getFriends().remove(friendship);

        friendshipRepository.delete(friendship);     
        
        messagingTemplate.convertAndSendToUser(
                                            friend.getEmail(),
                                            "/queue/notifications",
                                            new NotificationDTO<Map<String, String>>(
                                                "FRIEND REMOVED",
                                                Map.of("friendshipId", friendshipCode),
                                                LocalDateTime.now()
                                            )   
        );
    }

    public void acceptRequest(String email, String friendshipCode) {
        Friendship friendship = friendshipRepository
                                                    .findByFriendshipCode(friendshipCode)
                                                    .orElseThrow(() -> new EntityNotFoundException("Friendship not found"));
                                   
        if (!friendship.getFriend().getEmail().equals(email)) throw new AccessDeniedException("You cannot accept this request");

        if (friendship.getStatus() != Friendship.Status.PENDING) throw new IllegalStateException("Request is not pending");

        User user = friendship.getUser();
        User friend = friendship.getFriend();
        
        friendship.setStatus(Friendship.Status.FRIENDS);
        friendshipRepository.save(friendship);

        Conversation convo = conversationService.getOrCreatePrivateConversation(user, friend);

        messagingTemplate.convertAndSendToUser(
                                            user.getEmail(),
                                            "/queue/notifications",
                                            new NotificationDTO<Map<String,Object>>(
                                                "FRIEND ADDED",
                                                Map.of(
                                                    "friend", new FriendDTO(
                                                                    friendshipCode,
                                                                    friend.getUserName(),
                                                                    friend.getImgUrl(),
                                                                    "unblocked"
                                                                ),
                                                    "conversation", conversationService.mapToDTO(convo, user.getEmail())
                                                ),
                                                LocalDateTime.now()
                                            )   
        );

        messagingTemplate.convertAndSendToUser(
                                            friend.getEmail(),
                                            "/queue/notifications",
                                            new NotificationDTO<Map<String,Object>>(
                                                "FRIEND ADDED",
                                                Map.of(
                                                    "friend", new FriendDTO(
                                                                    friendshipCode,
                                                                    user.getUserName(),
                                                                    user.getImgUrl(),
                                                                    "unblocked"
                                                                ),
                                                    "conversation", conversationService.mapToDTO(convo, friend.getEmail())
                                                ),
                                                LocalDateTime.now()
                                            ) 
        );
    }

    public void rejectRequest(String email, String friendshipCode) {
        Friendship friendship = friendshipRepository
                                                    .findByFriendshipCode(friendshipCode)
                                                    .orElseThrow(() -> new EntityNotFoundException("Friendship not found"));
                                        
        if (!friendship.getFriend().getEmail().equals(email)) throw new AccessDeniedException("You cannot accept this request");

        if (friendship.getStatus() != Friendship.Status.PENDING) throw new IllegalStateException("Request is not pending");

        friendship.getUser().getFriends().remove(friendship);
        friendship.getFriend().getFriends().remove(friendship);

        friendshipRepository.delete(friendship);

        User friend = null;
        if(friendship.getUser().getEmail().equals(email)) friend = friendship.getFriend();
        else friend = friendship.getUser();

        messagingTemplate.convertAndSendToUser(
                                            friend.getEmail(),
                                            "/queue/notifications",
                                            new NotificationDTO<Map<String,String>>(
                                                "FRIEND REQUEST REJECTED",
                                                Map.of("friendshipId", friendshipCode),
                                                LocalDateTime.now()
                                            )   
        );
    }

    public void blockFriend(String userEmail, String friendshipCode) {
        Friendship friendship = friendshipRepository
                                                    .findByFriendshipCode(friendshipCode)
                                                    .orElseThrow(() -> new EntityNotFoundException("Friendship not found"));

        User user = userRepository
                                .findByEmail(userEmail)
                                .orElseThrow(() -> new UsernameNotFoundException("User not found"));


        if (friendship.getStatus() == Friendship.Status.PENDING) throw new AccessDeniedException("Friendship still pending.");
        
        if (!friendship.getUser().getEmail().equals(userEmail) &&
            !friendship.getFriend().getEmail().equals(userEmail))  throw new AccessDeniedException("Not allowed");

        friendship.setStatus(Friendship.Status.BLOCKED);
        friendship.setBlockedBy(user);

        friendshipRepository.save(friendship);

        User friend = null;
        if(friendship.getUser().getEmail().equals(userEmail)) friend = friendship.getFriend();
        else friend = friendship.getUser();

        messagingTemplate.convertAndSendToUser(
                                            user.getEmail(),
                                            "/queue/notifications",
                                            new NotificationDTO<Map<String,String>>(
                                                "FRIEND BLOCKED",
                                                Map.of(
                                                    "friendshipId", friendshipCode,
                                                    "conversationId", conversationService.getOrCreatePrivateConversation(user, friend).getConversationCode()
                                                ),
                                                LocalDateTime.now()
                                            )
        );   
        
        messagingTemplate.convertAndSendToUser(
                                            friend.getEmail(),
                                            "/queue/notifications",
                                            new NotificationDTO<Map<String,String>>(
                                                "FRIEND BLOCKED",
                                                Map.of(
                                                    "friendshipId", friendshipCode,
                                                    "conversationId", conversationService.getOrCreatePrivateConversation(user, friend).getConversationCode()
                                                ),
                                                LocalDateTime.now()
                                            )
        );   
    }

    public void unBlockFriend(String userEmail, String friendshipCode) {
        Friendship friendship = friendshipRepository
                                                    .findByFriendshipCode(friendshipCode)
                                                    .orElseThrow(() -> new EntityNotFoundException("Friendship not found"));

        if (friendship.getStatus() != Friendship.Status.BLOCKED) throw new AccessDeniedException("Friendship is not blocked.");
        
        if (!friendship.getBlockedBy().getEmail().equals(userEmail))  throw new AccessDeniedException("Not allowed");

        friendship.setStatus(Friendship.Status.FRIENDS);
        friendship.setBlockedBy(null);

        friendshipRepository.save(friendship);

        User user = null, friend = null;
        if(friendship.getUser().getEmail().equals(userEmail)) {
            user = friendship.getUser();
            friend = friendship.getFriend();
        }
        else {
            user = friendship.getFriend();
            friend = friendship.getUser();
        }

        messagingTemplate.convertAndSendToUser(
                                            friend.getEmail(),
                                            "/queue/notifications",
                                            new NotificationDTO<Map<String,String>>(
                                                "FRIEND UNBLOCKED",
                                                Map.of(
                                                    "friendshipId", friendshipCode,
                                                    "conversationId", conversationService.getOrCreatePrivateConversation(user, friend).getConversationCode()
                                                ),
                                                LocalDateTime.now()
                                            )   
        );   

        messagingTemplate.convertAndSendToUser(
                                            user.getEmail(),
                                            "/queue/notifications",
                                            new NotificationDTO<Map<String,String>>(
                                                "FRIEND UNBLOCKED",
                                                Map.of(
                                                    "friendshipId", friendshipCode,
                                                    "conversationId", conversationService.getOrCreatePrivateConversation(user, friend).getConversationCode()
                                                ),
                                                LocalDateTime.now()
                                            )   
        );   
    }
}
