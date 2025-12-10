package com.baatein.util;
import java.security.SecureRandom;
public class CodeGenerator {
    private static final String ALPHANUM = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final SecureRandom RAND = new SecureRandom();
    public static String random6() {
        StringBuilder sb = new StringBuilder(6);
        for (int i = 0; i < 6; i++) sb.append(ALPHANUM.charAt(RAND.nextInt(ALPHANUM.length())));
        return sb.toString();
    }
}
