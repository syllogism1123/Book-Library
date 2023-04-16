package com.example.booklibrary.model;


import org.springframework.data.annotation.Id;

public record Book(@Id String id, String isbn, String title, String author, BookArt art) {

    public Book(String isbn, String title, String author, BookArt art) {
        this(null, isbn, title, author, art);
    }

    public Book withId(String id) {
        return new Book(id, isbn, title, author, art);
    }

}

