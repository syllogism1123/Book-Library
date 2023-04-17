package com.example.booklibrary.model;

import org.springframework.data.mongodb.core.mapping.MongoId;

public record Book(@MongoId String id, String isbn, String title, String author, BookArt art) {
    public Book(String isbn, String title, String author, BookArt art) {
        this(null, isbn, title, author, art);
    }

}

