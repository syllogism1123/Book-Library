package com.example.booklibrary.service;

import com.example.booklibrary.model.MongoUser;
import com.example.booklibrary.repository.MongoUserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final MongoUserRepository mongoUserRepository;
    private final PasswordEncoder encoder;

    public UserService(MongoUserRepository mongoUserRepository, PasswordEncoder encoder) {
        this.mongoUserRepository = mongoUserRepository;
        this.encoder = encoder;
    }

    public MongoUser createMongoUser(String username, String password, String firstname, String lastname) {

        if (mongoUserRepository.findMongoUserByUsername(username).isPresent()) {
            throw new IllegalArgumentException("The username already exists.");
        } else {
            String encodedPassword = encoder.encode(password);
            MongoUser encodedUser = new MongoUser(username, encodedPassword, firstname, lastname);
            return mongoUserRepository.save(encodedUser);
        }
    }

}
