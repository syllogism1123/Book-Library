package com.example.booklibrary.controller;

import com.example.booklibrary.model.Book;
import com.example.booklibrary.service.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {
    private final BookService service;


    public BookController(BookService service) {
        this.service = service;
    }

    @GetMapping()
    public List<Book> getAllBooks() {
        return service.getAllBooks();
    }

    @PostMapping()
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        service.addBook(book);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public Book getBookById(@PathVariable String id) {
        return (service.getBookById(id));
    }

    @PutMapping("/{id}")
    public Book updateBookById(@PathVariable String id, @RequestBody Book updatedBook) {
        return service.updateBookById(id, updatedBook);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Book> deleteBookByISBN(@PathVariable String id) {
        service.deleteBookById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
