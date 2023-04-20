package com.example.booklibrary.service;

import com.example.booklibrary.model.Book;
import com.example.booklibrary.repository.BookRepository;
import com.example.booklibrary.repository.MongoUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.example.booklibrary.model.BookArt.EBOOK;
import static com.example.booklibrary.model.BookArt.SOFTCOVER;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class BookServiceTest {
    private BookService service;
    @Mock
    private BookRepository bookRepo;
    @Mock
    private MongoUserRepository mongoUserRepo;

    @BeforeEach
    void setup() {
        service = new BookService(bookRepo);
    }


    @Test
    void getAllBooks() {
        String userId = UUID.randomUUID().toString();
        List<Book> books = new ArrayList<>(List.of(
                new Book(
                        "9781617294945",
                        "Spring in Action",
                        "Craig Walls",
                        SOFTCOVER, userId),
                new Book(
                        "9780134685991",
                        "Effective Java",
                        "Joshua Bloch",
                        EBOOK, userId)));



        List<Book> bookList = service.getAllBooksByUserId(userId);

        verify(bookRepo).findByUserId(userId);

    }

    @Test
    void getBookById() {
        String id = UUID.randomUUID().toString();
        String userId = UUID.randomUUID().toString();
        Book book = new Book(id,
                "9781617294945",
                "Spring in Action",
                "Craig Walls", Instant.now(),
                SOFTCOVER, userId);
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
                SOFTCOVER, userId);

        service.addBook(book, userId);

        verify(bookRepo).save(book);
    }

    @Test
    void updateBookById() {
        String id = UUID.randomUUID().toString();

        String userId = UUID.randomUUID().toString();
        Book book = new Book(id,
                "9781617294945",
                "Spring in Action",
                "Craig Walls", Instant.now(),
                SOFTCOVER, userId);

        Book updatedBook = new Book(id,
                "9781617294945",
                "Spring in Action",
                "Craig Walls", Instant.now(),
                EBOOK, userId);

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
