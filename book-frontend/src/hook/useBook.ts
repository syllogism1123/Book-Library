import axios from "axios";
import {useEffect, useState} from "react";
import {Book, BookModel} from "../model/BookModel";
import {toast} from "react-toastify";

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

    const loadAllBooks = async () => {

        const authToken = localStorage.getItem('authToken');
        await axios.get("http://localhost:8080/api/books", {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            withCredentials: true
        }).then((response) => {
            setBooks(response.data)
        })
            .catch((error) => {
                console.error(error);
            })
    };
    const addBook = async (newBook: BookModel) => {

        const authToken = localStorage.getItem('authToken');
        await axios.post("http://localhost:8080/api/books", newBook, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            withCredentials: true
        }).then((response) => {
            setBooks([...books, response.data])
        }).catch((error) => {
            toast.error("Unkown Error, try again later! " + error.response.statusText, {autoClose: 10000})
        })
    }

    const updateBook = async (book: Book) => {

        const authToken = localStorage.getItem('authToken');
        await axios.put(`http://localhost:8080/api/books/${book.id}`, book, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
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
        }).catch(error => {
            console.error(error);
        })
    }

    const deleteBook = async (id: string) => {

        const authToken = localStorage.getItem('authToken');
        await axios.delete(`http://localhost:8080/api/books/${id}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            withCredentials: true
        }).then(() => {
            setBooks(books.filter((book) => book.id !== id));
        }).catch((error) => {
            console.error(error)
        })
    };

    useEffect(() => {
        loadAllBooks().catch(
            (r) => {
                console.error(r)
            }
        )
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