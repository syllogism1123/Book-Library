package com.example.booklibrary.repository;

import com.example.booklibrary.model.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends MongoRepository<Book, String> {

    Book findBookByIsbn(String isbn);
    void deleteBookByIsbn(String isbn);

}
