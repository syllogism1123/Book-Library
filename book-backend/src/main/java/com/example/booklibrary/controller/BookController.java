package com.example.booklibrary.controller;

import com.example.booklibrary.model.Book;
import com.example.booklibrary.service.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class BookController {
    private final BookService service;

    public BookController(BookService service) {
        this.service = service;
    }

    @GetMapping()
    public ResponseEntity<List<Book>> getAllBooks() {

        return new ResponseEntity<>(service.getAllBooks(), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        return new ResponseEntity<>(service.addBook(book), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable String id) {

        return new ResponseEntity<>(service.getBookById(id), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBookById(@PathVariable String id, @RequestBody Book updatedBook) {
        return new ResponseEntity<>(service.updateBookById(id, updatedBook), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBookById(@PathVariable String id) {
        service.deleteBookById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
