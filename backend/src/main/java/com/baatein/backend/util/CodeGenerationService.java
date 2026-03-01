package com.baatein.backend.util;

import java.security.SecureRandom;

import org.springframework.stereotype.Service;

import com.baatein.backend.repositories.ConversationRepository;
import com.baatein.backend.repositories.FriendshipRepository;
import com.baatein.backend.repositories.MessageRepository;
import com.baatein.backend.repositories.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CodeGenerationService {

    private static final String ALPHANUM = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int FRIEND_CODE_LENGTH = 6;
    private static final int FRIENDSHIP_RANDOM_LEN = 5;
    private static final int CONVERSATION_RANDOM_LEN = 11;
    private static final int MESSAGE_RANDOM_LEN = 11;
    private static final int MAX_RETRIES = 5;
    private static final String FRIENDSHIP_PREFIX = "f_";
    private static final String CONVERSATION_PREFIX = "c_";
    private static final String MESSAGE_PREFIX = "m_";

    private final SecureRandom random = new SecureRandom();
    private final UserRepository userRepository;
    private final FriendshipRepository friendshipRepository;
    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;

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

    public String generateUniqueConversationCode() {
        for (int i = 0; i < MAX_RETRIES; i++) {
            String code = CONVERSATION_PREFIX + generateCode(CONVERSATION_RANDOM_LEN);
            if (!conversationRepository.existsByConversationCode(code)) {
                return code;
            }
        }
        throw new IllegalStateException("Unable to generate unique conversation code");
    }

    public String generateUniqueMessageCode() {
        for (int i = 0; i < MAX_RETRIES; i++) {
            String code = MESSAGE_PREFIX + generateCode(MESSAGE_RANDOM_LEN);
            if (!messageRepository.existsByMessageCode(code)) {
                return code;
            }
        }
        throw new IllegalStateException("Unable to generate unique conversation code");
    }

    private String generateCode(int length) {
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(ALPHANUM.charAt(random.nextInt(ALPHANUM.length())));
        }
        return sb.toString();
    }
}
