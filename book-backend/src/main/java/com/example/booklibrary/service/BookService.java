package com.example.booklibrary.service;

import com.example.booklibrary.model.Book;
import com.example.booklibrary.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class BookService {
    private final BookRepository bookRepos;

    public BookService(BookRepository bookRepos) {
        this.bookRepos = bookRepos;
    }

    public List<Book> getAllBooks() {
        return bookRepos.findAll();
    }

    public Book addBook(Book book) {
        return bookRepos.save(book);
    }

    public Book getBookById(String id) {
        return bookRepos.findById(id).orElseThrow();
    }

    public Book updateBookById(String id, Book newBook) {
        if (getBookById(id) != null) {
            return bookRepos.save(newBook);

        } else {
            throw new NoSuchElementException("Book not found!");
        }
    }

    public void deleteBookById(String id) {
        bookRepos.deleteById(id);
    }

}
