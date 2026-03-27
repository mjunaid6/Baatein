package com.baatein.backend.auth.config;

import org.springframework.http.ResponseCookie;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

public class CookieUtil {

    public static void addRefreshCookie(
            HttpServletResponse response,
            String refreshToken
    ) {
        ResponseCookie cookie = ResponseCookie.from("refresh_token", refreshToken)
                                            .httpOnly(true)
                                            .secure(false) 
                                            .path("/")
                                            .sameSite("Lax")
                                            .maxAge(7 * 24 * 60 * 60)
                                            .build();

        response.addHeader("Set-Cookie", cookie.toString());
    }


    public static void deleteRefreshToken(HttpServletResponse response) {
        Cookie cookie = new Cookie("refresh_token", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(0);

        response.addCookie(cookie);
    }
}
