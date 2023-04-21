package com.example.booklibrary.service;

import com.example.booklibrary.model.Book;
import com.example.booklibrary.repository.BookRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.util.*;

import static com.example.booklibrary.model.BookArt.EBOOK;
import static com.example.booklibrary.model.BookArt.SOFTCOVER;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class BookServiceTest {
    private BookService service;
    @Mock
    private BookRepository bookRepo;

    @BeforeEach
    void setup() {
        service = new BookService(bookRepo);
    }


    @Test
    void getAllBooks() {
        String userId = UUID.randomUUID().toString();
        List<Book> books = new ArrayList<>(
                List.of(
                        new Book("123",
                                "9781617294945",
                                "Spring in Action",
                                "Craig Walls",
                                Instant.now(),
                                SOFTCOVER,
                                userId),
                        new Book("123",
                                "9780134685991",
                                "Effective Java",
                                "Joshua Bloch",
                                Instant.now(),
                                EBOOK,
                                userId)));
        when(bookRepo.findByUserId(userId)).thenReturn(books);


        List<Book> actual = service.getAllBooksByUserId(userId);

        verify(bookRepo).findByUserId(userId);
        assertEquals(books, actual);
    }

    @Test
    void getBookById() {
        String id = UUID.randomUUID().toString();
        String userId = UUID.randomUUID().toString();
        Book book = new Book(
                id,
                "9781617294945",
                "Spring in Action",
                "Craig Walls",
                Instant.now(),
                SOFTCOVER,
                userId);
        when(bookRepo.findById(id)).thenReturn(Optional.of(book));

        Book actual = service.getBookById(id);

        verify(bookRepo).findById(id);
        assertEquals(book, actual);
    }

    @Test
    void addBook() {
        String userId = UUID.randomUUID().toString();
        Book book = new Book(
                "9781260463415",
                "Java: The Complete Reference",
                "Herbert Schildt",
                SOFTCOVER
        );

        service.addBook(book, userId);

        verify(bookRepo).save(any(Book.class));
    }

    @Test
    void updateBookById() {
        String id = UUID.randomUUID().toString();

        String userId = UUID.randomUUID().toString();
        Book book = new Book(
                id,
                "9781617294945",
                "Spring in Action",
                "Craig Walls",
                Instant.now(),
                SOFTCOVER,
                userId);

        Book updatedBook = new Book(
                id,
                "9781617294945",
                "Spring in Action",
                "Craig Walls",
                Instant.now(),
                EBOOK,
                userId);

        when(bookRepo.findById(id)).thenReturn(Optional.of(book));

        service.updateBookById(id, updatedBook);

        verify(bookRepo).findById(id);
        verify(bookRepo).save(updatedBook);

    }

    @Test
    void deleteBookById() {
        String id = UUID.randomUUID().toString();

        service.deleteBookById(id);

        verify(bookRepo).deleteById(id);

    }
}
