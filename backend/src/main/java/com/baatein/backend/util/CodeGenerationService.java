package com.baatein.backend.util;

import java.security.SecureRandom;

import org.springframework.stereotype.Service;

import com.baatein.backend.repositories.FriendshipRepository;
import com.baatein.backend.repositories.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CodeGenerationService {

    private static final String ALPHANUM = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int FRIEND_CODE_LENGTH = 6;
    private static final int FRIENDSHIP_RANDOM_LEN = 5;
    private static final int MAX_RETRIES = 5;
    private static final String FRIENDSHIP_PREFIX = "f_";

    private final SecureRandom random = new SecureRandom();
    private final UserRepository userRepository;
    private final FriendshipRepository friendshipRepository;

    public String generateUniqueFriendCode() {
        for (int i = 0; i < MAX_RETRIES; i++) {
            String code = generateCode(FRIEND_CODE_LENGTH);
            if (!userRepository.existsByFriendCode(code)) {
                return code;
            }
        }
        throw new IllegalStateException("Unable to generate unique friend code");
    }

    public String generateUniqueFriendshipCode() {
        for (int i = 0; i < MAX_RETRIES; i++) {
            String code = FRIENDSHIP_PREFIX + generateCode(FRIENDSHIP_RANDOM_LEN);
            if (!friendshipRepository.existsByFriendshipCode(code)) {
                return code;
            }
        }
        throw new IllegalStateException("Unable to generate unique friendship code");
    }

    private String generateCode(int length) {
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(ALPHANUM.charAt(random.nextInt(ALPHANUM.length())));
        }
        return sb.toString();
    }
}
