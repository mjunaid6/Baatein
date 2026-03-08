package com.baatein.backend.services;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.stream.Stream;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.baatein.backend.util.storageUtil.StorageService;

import io.jsonwebtoken.MalformedJwtException;
import jakarta.annotation.PostConstruct;

@Service
public class ProfilePicStorageService implements StorageService {
    @Value("${storage.profilePics}")
    private String storagePath;

    private Path rootLocation;

    @Override
    public String store(MultipartFile multipartFile) {

        if (multipartFile.isEmpty()) {
            throw new RuntimeException("Failed to store empty file");
        }

        String originalFilename = multipartFile.getOriginalFilename();

        if (originalFilename == null) {
            throw new RuntimeException("File name is invalid");
        }

        String filename = System.currentTimeMillis() + "_" + Paths.get(originalFilename).getFileName();
        
        Path destinationFile = rootLocation
        .resolve(filename)
        .normalize()
        .toAbsolutePath();

        if (!destinationFile.getParent().equals(rootLocation.toAbsolutePath())) {
            throw new RuntimeException("Cannot store file outside current directory.");
        }

        try (InputStream inputStream = multipartFile.getInputStream()) {
            Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file.", e);
        }

        return filename; 
    }

    @Override
    public Resource loadAsResource(String filename) {
        try{
            Path file = load(filename);

            Resource resource = new UrlResource(file.toUri());
            
            if(resource.exists() || resource.isReadable()) return resource;
            else throw new RuntimeException("Couldn't read file : " + filename);
        } catch (MalformedURLException e) {
            throw new MalformedJwtException("Couldn't read file : " + filename, e);
        }
    }

    @Override
    public Path load(String filename) {
        return rootLocation.resolve(filename);
    }

    @Override
    public Stream<Path> loadAll() {
        try{
            return Files.walk(rootLocation, 1)
                        .filter(path -> !path.equals(rootLocation))
                        .map(rootLocation::relativize);
        } catch(IOException e) {
            throw new RuntimeException("Failed to read files", e);
        }
    }

    @Override
    public void deleteAll() {
        // FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

    @Override
    @PostConstruct
    public void init(){
        try{
            rootLocation = Paths.get(storagePath).toAbsolutePath().normalize();
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new RuntimeException("Couldn't initialize storage", e);
        }
    }

}
