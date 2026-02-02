package com.baatein.backend.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.baatein.backend.dtos.friendDTOs.AddFriendDTO;
import com.baatein.backend.dtos.friendDTOs.FriendDTO;
import com.baatein.backend.dtos.friendDTOs.FriendListResponseDTO;
import com.baatein.backend.services.FriendService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("friend")
@AllArgsConstructor
public class FriendController {

    private final FriendService friendService;
    
    @GetMapping("/getFriendList")
    public ResponseEntity<FriendListResponseDTO> getFriends() {
        String email = SecurityContextHolder.getContext()
                                            .getAuthentication()
                                            .getName();

        List<FriendDTO> friends = friendService.getFriendsUsingEmail(email);

        if(friends == null) return ResponseEntity
                                                .status(HttpStatus.NOT_FOUND)
                                                .body(null);
        
        return ResponseEntity
                            .status(HttpStatus.OK)
                            .body(new FriendListResponseDTO(friends));
    }
    
    @PutMapping("/addFriend")
    public ResponseEntity<String> addFriend(@RequestBody AddFriendDTO addFriendDTO) {
        String email = SecurityContextHolder
                                            .getContext()
                                            .getAuthentication()
                                            .getName();
                                            
        friendService.addFriend(addFriendDTO.getFriendId(), email);

        return ResponseEntity.ok("Friend request sent successfully.");
    }

    @DeleteMapping("/{friendshipCode}/delete")
    public ResponseEntity<String> deleteFriend(@PathVariable String friendshipCode) {
        String email = SecurityContextHolder
                                            .getContext()
                                            .getAuthentication()
                                            .getName();
                                            
        friendService.deleteFriend(email, friendshipCode);

        return ResponseEntity.ok("Friend deleted successfully.");
    }

    @PostMapping("/{friendshipCode}/accept")
    public ResponseEntity<String> acceptFriendRequest(@PathVariable String friendshipCode) {
        String email = SecurityContextHolder
                                            .getContext()
                                            .getAuthentication()
                                            .getName();
        friendService.acceptRequest(email, friendshipCode);
        return ResponseEntity.ok("Accepted successfully");
    }

    @PostMapping("/{friendshipCode}/reject")
    public ResponseEntity<String> rejectFriendRequest(@PathVariable String friendshipCode) {
        friendService.rejectRequest(friendshipCode);
        return ResponseEntity.ok("Rejected successfully");
    }

    @PostMapping("/{friendshipCode}/block")
    public ResponseEntity<String> blockFriend(@PathVariable String friendshipCode) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        friendService.blockFriend(email,friendshipCode);
        return ResponseEntity.ok("Blocked successfully");
    }

    @PostMapping("/{friendshipCode}/unblock")
    public ResponseEntity<String> unBlockFriend(@PathVariable String friendshipCode) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        friendService.unBlockFriend(email,friendshipCode);
        return ResponseEntity.ok("Unblocked successfully");
    }
}
