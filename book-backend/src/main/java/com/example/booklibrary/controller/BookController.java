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

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class BookController {
    private final BookService bookService;
    private final UserService userService;

    private static final String NO_USER_FOUND = "user not found";

    public BookController(BookService bookService, UserService userService) {
        this.bookService = bookService;
        this.userService = userService;
    }

    @GetMapping()
    public ResponseEntity<List<Book>> getAllBooks() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        MongoUser user = userService.findUserByUsername(username);
        String userId = user.id();
        return new ResponseEntity<>(bookService.getAllBooksByUserId(userId), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        MongoUser user = userService.findUserByUsername(username);
        String userId = user.id();
        book.withUserId(userId);
        return new ResponseEntity<>(bookService.addBook(book, userId), HttpStatus.CREATED);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable String id) {
        return new ResponseEntity<>(bookService.getBookById(id), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBookById(@PathVariable String id, @RequestBody Book updatedBook) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        MongoUser user = userService.findUserByUsername(username);
        if (bookService.getBookById(id) != null) {
            String userId = user.id();
            updatedBook.withUserId(userId);
            return new ResponseEntity<>(bookService.updateBookById(id, updatedBook), HttpStatus.OK);
        }
        throw new NoSuchElementException(NO_USER_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBookById(@PathVariable String id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        MongoUser user = userService.findUserByUsername(username);
        if (bookService.getBookById(id) != null) {
            String userId = user.id();
            bookService.deleteBookByIdAndUserId(id, userId);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        throw new NoSuchElementException(NO_USER_FOUND);
    }
}
