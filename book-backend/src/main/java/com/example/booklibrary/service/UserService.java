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

    public MongoUser addMongoUser(MongoUser mongoUser) {
        String username = mongoUser.username();
        String password = mongoUser.password();
        String encodedPassword = encoder.encode(password);
        MongoUser encodedUser = new MongoUser(username, encodedPassword);
        return mongoUserRepository.save(encodedUser);
    }
}
