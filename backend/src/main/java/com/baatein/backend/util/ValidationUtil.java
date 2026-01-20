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
                isUserNameValid(signUpDTO.getUsername());
    }

    public static boolean isUserNameValid(String username) {
        return username != null && username.length() >= 3;
    }


    public static boolean isEmailValid(String email) {
        if (email == null) return false;
        return email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");
    }


    public static boolean isPasswordValid(String password) {
        if (password == null || password.length() < 8) return false;

        return password.matches(".*[!@#$&*].*");
    }


}
