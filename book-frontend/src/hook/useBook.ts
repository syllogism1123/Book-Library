import axios from "axios";
import {useEffect, useState} from "react";
import {Book, BookModel} from "../model/BookModel";

export const useBook = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [text, setText] = useState<string>('');

    const onTextChange = (text: string) => {
        setText(text);
    }
    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(text.toLowerCase()) ||
        book.author.toLowerCase().includes(text.toLowerCase()) ||
        book.id.toLowerCase().includes(text.toLowerCase())
    );

    const loadAllBooks = () => {

        const authToken = localStorage.getItem('authToken');
        axios.get("http://localhost:8080/api/books", {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
            withCredentials: true
        }).then((response) => setBooks(response.data))
            .catch((error) => {
                console.error(error);
            })
    };
    const addBook = (newBook: BookModel) => {

        const authToken = localStorage.getItem('authToken');
        axios.post("http://localhost:8080/api/books", newBook, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
            withCredentials: true
        }).then(() => {
            loadAllBooks()
        }).catch((error) => {
            console.error(error);
        })
    }

    const updateBook = (book: Book) => {

        const authToken = localStorage.getItem('authToken');
        axios.put(`http://localhost:8080/api/books/${book.id}`, book, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
            withCredentials: true
        }).then((response) => {
            setBooks(books.map((currentBook) => {
                if (currentBook.id === book.id) {
                    return response.data;
                } else {
                    return currentBook;
                }
            }))
        }).then(() => {
            loadAllBooks()
        })
            .catch(error => {
                console.error(error);
            })
    }

    const deleteBook = (id: string) => {

        const authToken = localStorage.getItem('authToken');
        axios.delete(`http://localhost:8080/api/books/${id}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
            withCredentials: true
        }).then(() => {
            setBooks(books.filter((book) => book.id !== id));
        }).catch((error) => {
            console.error(error)
        })
    };

    useEffect(() => {
        loadAllBooks()
    }, []);

    return {
        onTextChange,
        text,
        filteredBooks,
        addBook,
        loadAllBooks,
        deleteBook,
        updateBook,
    };
}