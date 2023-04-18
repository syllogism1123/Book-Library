package com.example.booklibrary.service;

import com.example.booklibrary.model.Book;
import com.example.booklibrary.repository.BookRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.example.booklibrary.model.BookArt.EBOOK;
import static com.example.booklibrary.model.BookArt.SOFTCOVER;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

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
        List<Book> books = new ArrayList<>(List.of(
                new Book(
                        "9781617294945",
                        "Spring in Action",
                        "Craig Walls",
                        SOFTCOVER),
                new Book(
                        "9780134685991",
                        "Effective Java",
                        "Joshua Bloch",
                        EBOOK)));
        when(bookRepo.findAll()).thenReturn(books);


        List<Book> bookList = service.getAllBooks();

        verify(bookRepo).findAll();
        assertEquals(books, bookList);
    }

    @Test
    void getBookById() {
        String id = UUID.randomUUID().toString();
        Book book = new Book(id,
                "9781617294945",
                "Spring in Action",
                "Craig Walls", Instant.now(),
                SOFTCOVER);
        when(bookRepo.findById(id)).thenReturn(Optional.of(book));

        Book actual = service.getBookById(id);

        verify(bookRepo).findById(id);
        assertEquals(book, actual);
    }

    @Test
    void addBook() {

        Book book = new Book(
                "9781260463415",
                "Java: The Complete Reference",
                "Herbert Schildt",
                SOFTCOVER);
        when(bookRepo.save(book)).thenReturn(book);

        Book actual = service.addBook(book);

        verify(bookRepo).save(book);
        assertEquals(book, actual);
    }

    @Test
    void updateBookById() {
        String id = "123";
        Book book = new Book(id,
                "9781617294945",
                "Spring in Action",
                "Craig Walls", Instant.now(),
                SOFTCOVER);

        Book updatedBook = new Book(id,
                "9781617294945",
                "Spring in Action",
                "Craig Walls", Instant.now(),
                EBOOK);

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
