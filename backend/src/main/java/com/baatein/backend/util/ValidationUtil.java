package com.baatein.backend.util;

import com.baatein.backend.dtos.SignUpDTO;
import com.baatein.backend.dtos.UserLoginDto;

public class ValidationUtil {
    public static boolean isUserValid(UserLoginDto userDto) {
        return isEmailValid(userDto.getEmail()) && 
                isPasswordValid(userDto.getPassword());
    }

    public static boolean isUserValid(SignUpDTO signUpDTO) {
        return isEmailValid(signUpDTO.getEmail()) && 
                isPasswordValid(signUpDTO.getPassword()) &&
                isUserNameValid(signUpDTO.getUserName());
    }

    public static boolean isUserNameValid(String username) {
        return username != null && username.length() > 3;
    }

    public static boolean isEmailValid(String email) {
        if(email == null) return false;
        int idx1 = email.indexOf('@');
        int idx2 = email.indexOf('.');
        return idx1 > 0 && idx2 > 0 && idx1 < idx2;
    }

    public static boolean isPasswordValid(String password) {
        if(password == null || password.length() < 6) return false;
        return password.contains("@") || 
            password.contains("#") ||
            password.contains("$") || 
            password.contains("&") ||
            password.contains("!");
    }

}
