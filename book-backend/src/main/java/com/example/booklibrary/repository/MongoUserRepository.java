package com.example.booklibrary.repository;

import com.example.booklibrary.model.MongoUser;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface MongoUserRepository extends MongoRepository<MongoUser, String> {
    Optional<MongoUser> findMongoUserByUsername(String username);
}
