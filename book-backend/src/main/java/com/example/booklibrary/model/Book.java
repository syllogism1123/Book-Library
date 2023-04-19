package com.example.booklibrary.model;

import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.Instant;


public record Book(@MongoId String id,
                   String isbn,
                   String title,
                   String author,
                   Instant instant,
                   BookArt art,
                   String userId) {
    public Book(String isbn, String title, String author, BookArt art, String userId) {
        this(null,
                isbn,
                title,
                author,
                Instant.now(),
                art,
                userId);
    }
}

