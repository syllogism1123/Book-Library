package com.example.booklibrary.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.Collections;
import java.util.List;

@Document("mongoUsers")
public record MongoUser(
        @MongoId
        String id,
        String username,
        String password,
        List<String> roles) {
    public MongoUser(String username, String password) {
        this(null, username, password, Collections.emptyList());
    }
}
