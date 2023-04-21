package com.example.booklibrary.controller;

import com.example.booklibrary.model.Book;
import com.example.booklibrary.model.MongoUser;
import com.example.booklibrary.service.BookService;
import com.example.booklibrary.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class BookController {
    private final BookService bookService;
    private final UserService userService;

    public BookController(BookService bookService, UserService userService) {
        this.bookService = bookService;
        this.userService = userService;
    }

    @GetMapping()
    public ResponseEntity<List<Book>> getAllBooks() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<MongoUser> user = userService.findUserByUsername(username);
        if (user.isPresent()) {
            String userId = user.get().id();
            return new ResponseEntity<>(bookService.getAllBooksByUserId(userId), HttpStatus.OK);
        }
        throw new NoSuchElementException("user not found");
    }

    @PostMapping()
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<MongoUser> user = userService.findUserByUsername(username);
        if (user.isPresent()) {
            String userId = user.get().id();
            return new ResponseEntity<>(bookService.addBook(book, userId), HttpStatus.CREATED);
        }
        throw new NoSuchElementException("user not found");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable String id) {
        return new ResponseEntity<>(bookService.getBookById(id), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBookById(@PathVariable String id, @RequestBody Book updatedBook) {
        return new ResponseEntity<>(bookService.updateBookById(id, updatedBook), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBookById(@PathVariable String id) {
        bookService.deleteBookById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
