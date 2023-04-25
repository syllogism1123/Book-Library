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
            book.withUserId(userId); // add this line to set the userID in the book object
            return new ResponseEntity<>(bookService.addBook(book, userId), HttpStatus.CREATED);
        }
        throw new NoSuchElementException("This user not found");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable String id) {
        return new ResponseEntity<>(bookService.getBookById(id), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBookById(@PathVariable String id, @RequestBody Book updatedBook) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<MongoUser> user = userService.findUserByUsername(username);
        if (user.isPresent()) {
            String userId = user.get().id();
            updatedBook.withUserId(userId); // add this line to set the userID in the updated book object
            return new ResponseEntity<>(bookService.updateBookById(id, updatedBook), HttpStatus.OK);
        }
        throw new NoSuchElementException("user not found");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBookById(@PathVariable String id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<MongoUser> user = userService.findUserByUsername(username);
        if (user.isPresent()) {
            String userId = user.get().id();
            bookService.deleteBookByIdAndUserId(id, userId); // change to deleteBookByIdAndUserId method which takes userID as well
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        throw new NoSuchElementException("user not found");
    }
}
