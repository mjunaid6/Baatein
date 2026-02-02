package com.baatein.backend.util;

import java.security.SecureRandom;

import com.baatein.backend.repositories.FriendshipRepository;
import com.baatein.backend.repositories.UserRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class CodeGeneration {
    private static final String ALPHANUM = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int CODE_LENGTH = 6;
    private static final int MAX_RETRIES = 5;

    private static SecureRandom random = new SecureRandom();

    private static UserRepository userRepository;
    private static FriendshipRepository friendshipRepository;

    public static String generateUniqueFriendCode() {
        String code;

        for (int i = 0; i < MAX_RETRIES; i++) {
            code = generateFriendCode();

            if (!userRepository.existsByFriendCode(code)) {
                return code;
            }
        }

        throw new IllegalStateException("Unable to generate unique friend code");
    }

    private static String generateFriendCode() {
        StringBuilder sb = new StringBuilder(CODE_LENGTH);
        for (int i = 0; i < CODE_LENGTH; i++) {
            sb.append(ALPHANUM.charAt(random.nextInt(ALPHANUM.length())));
        }
        return sb.toString();
    }

    public static String generateUniqueFriendshipCode() {
        String code;

        for (int i = 0; i < MAX_RETRIES; i++) {
            code = generateFriendshipCode();

            if (!friendshipRepository.existsByFriendshipCode(code)) {
                return code;
            }
        }

        throw new IllegalStateException("Unable to generate unique friend code");
    }

    private static String generateFriendshipCode() {
        StringBuilder sb = new StringBuilder(6);
        sb.append("f_");
        for (int i = 0; i < 5; i++) {
            sb.append(ALPHANUM.charAt(random.nextInt(ALPHANUM.length())));
        }
        return sb.toString();
    }
}
