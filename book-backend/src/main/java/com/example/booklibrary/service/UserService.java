package com.example.booklibrary.service;

import com.example.booklibrary.model.MongoUser;
import com.example.booklibrary.model.MongoUserDTO;
import com.example.booklibrary.repository.MongoUserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class UserService {
    private final MongoUserRepository mongoUserRepository;
    private final PasswordEncoder encoder;

    public UserService(MongoUserRepository mongoUserRepository, PasswordEncoder encoder) {
        this.mongoUserRepository = mongoUserRepository;
        this.encoder = encoder;
    }

    public MongoUser createMongoUser(MongoUserDTO mongoUserDTO) {

        if (mongoUserRepository.findMongoUserByUsername(mongoUserDTO.username()).isPresent()) {
            throw new IllegalArgumentException("The username already exists.");
        } else {
            String encodedPassword = encoder.encode(mongoUserDTO.password());
            MongoUser encodedUser = new MongoUser(mongoUserDTO.username(), encodedPassword, mongoUserDTO.firstname(), mongoUserDTO.lastname());
            return mongoUserRepository.save(encodedUser);
        }
    }

    public MongoUser findUserByUsername(String username) {
        return mongoUserRepository.findMongoUserByUsername(username).orElseThrow(NoSuchElementException::new);
    }
}
