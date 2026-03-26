package com.baatein.backend.controllers;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.baatein.backend.services.ProfilePicStorageService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("files")
@AllArgsConstructor
public class MediaController {
    private final ProfilePicStorageService profilePicStorageService;

    @GetMapping("/profilePic/{filename}")
    public ResponseEntity<Resource> getProfilePic(@PathVariable String filename) {

        Resource file = profilePicStorageService.loadAsResource(filename);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
                .body(file);
    }
}
