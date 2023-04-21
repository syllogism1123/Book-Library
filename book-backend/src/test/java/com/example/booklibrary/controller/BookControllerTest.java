package com.example.booklibrary.controller;


import com.example.booklibrary.model.Book;
import com.example.booklibrary.model.MongoUser;
import com.example.booklibrary.repository.BookRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.json.AutoConfigureJsonTesters;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import static com.example.booklibrary.model.BookArt.SOFTCOVER;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureJsonTesters
class BookControllerTest {
    @Autowired
    private MockMvc mvc;
    @Autowired
    private JacksonTester<Book> json;
    @Autowired
    private MongoTemplate mongoTemplate;
    @MockBean
    private BookRepository bookRepository;
    private Book book;
    private String id;

    @BeforeEach
    void setup() {
        id = UUID.randomUUID().toString();
        String userId = UUID.randomUUID().toString();
        MongoUser user = new MongoUser(userId, "user", "password", "firstname", "lastname");
        mongoTemplate.save(user);
        book = new Book(id, "9781260463415",
                "Java: The Complete Reference",
                "Herbert Schildt", Instant.now(),
                SOFTCOVER, userId);
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void getAllBooks() throws Exception {
        mvc.perform(get("/api/books").
                        contentType(MediaType.APPLICATION_JSON)).
                andExpect(status().isOk()).
                andExpect(content().json("""
                        [ ]
                        """));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void getBookById() throws Exception {
        when(bookRepository.findById(id)).thenReturn(Optional.ofNullable(book));

        mvc.perform(post("/api/books").
                        contentType(MediaType.APPLICATION_JSON).
                        content(json.write(book).getJson()).with(csrf())).
                andExpect(status().isCreated());

        mvc.perform(get("/api/books/" + id).
                        contentType(MediaType.APPLICATION_JSON)).
                andExpect(status().isOk())
                .andExpect(content().
                        json("""
                                {
                                "isbn": "9781260463415",
                                "title": "Java: The Complete Reference",
                                "author": "Herbert Schildt",
                                "art": "SOFTCOVER"
                                }
                                """)).
                andExpect(jsonPath("$.id").isNotEmpty());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void addBook() throws Exception {
        mvc.perform(post("/api/books").
                        contentType(MediaType.APPLICATION_JSON).
                        content(json.write(book).getJson()).with(csrf())).
                andExpect(status().isCreated());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void updateBookById() throws Exception {
        when(bookRepository.findById(id)).thenReturn(Optional.ofNullable(book));

        mvc.perform(post("/api/books").
                        contentType(MediaType.APPLICATION_JSON).
                        content(json.write(book).getJson()).with(csrf())).
                andExpect(status().isCreated());

        mvc.perform(put("/api/books/" + id).
                        contentType(MediaType.APPLICATION_JSON).
                        content("""
                                {
                                "isbn": "9781260463415",
                                "title": "Java: The Complete Reference",
                                "author": "Herbert Schildt",
                                "art": "EBOOK"
                                }
                                """).with(csrf())).
                andExpect(status().isOk());

    }

    @Test
    @DirtiesContext
    @WithMockUser
    void deleteBookById() throws Exception {
        mvc.perform(delete("/api/books/" + id).
                        contentType(MediaType.APPLICATION_JSON).with(csrf())).
                andExpect(status().isNoContent());
    }
}