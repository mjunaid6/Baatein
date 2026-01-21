package com.baatein.backend.auth.config;

import org.springframework.beans.factory.annotation.Value;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

public class CookieUtil {

    @Value("${refresh-token.expiry}")
    private static long expiry;

    public static void addRefreshCookie(
            HttpServletResponse response,
            String refreshToken
    ) {
        response.addHeader("Set-Cookie",
            "refresh_token=" + refreshToken +
            "; Path=/" +
            "; HttpOnly" +
            "; SameSite=Lax"
        );
    }


    public static void deleteRefreshToken(HttpServletResponse response) {
        Cookie cookie = new Cookie("refresh_token", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);

        response.addCookie(cookie);
    }
}
