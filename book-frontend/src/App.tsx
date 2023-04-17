import React, {useEffect, useState} from 'react';
import './App.css';
import Header from "./component/Header";
import {Book, BookModel} from "./component/BookModel";
import axios from "axios";
import BooKGallery from "./component/BooKGallery";
import {SearchBar} from "./component/SearchBar";
import {Alert} from "@mui/material";
import {AddBook} from "./component/AddBook";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {LoginPage} from "./component/LoginPage";
import {BookDetails} from "./component/BookDetails";
import useUser from "./component/useUser";


function App() {
    const {login} = useUser();
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
            loadAllBooks()
        }).catch((error) => {
            console.error(error)
        })
    };


    useEffect(() => {
        loadAllBooks()
    }, []);


    return (
        <div className="App">

            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<Navigate to="/books"/>}>
                    </Route>
                    <Route path="/login" element={<LoginPage onLogin={login}/>}>
                    </Route>
                    <Route path='/books' element={
                        <div>
                            <SearchBar text={text} onTextChange={onTextChange}/>
                            {filteredBooks.length > 0 ?
                                <BooKGallery books={filteredBooks}
                                             addBook={addBook} updateBook={updateBook}
                                             deleteBook={deleteBook}/>
                                : <Alert severity="error" className="no-book-found">
                                    <h3>No Book Found!</h3>
                                </Alert>
                            }
                        </div>}>
                    </Route>
                    <Route path='/books/add'
                           element={<AddBook addBook={addBook}/>}>
                    </Route>
                    <Route path="/books/:id" element={<BookDetails/>}/>
                </Routes>
            </BrowserRouter>


        </div>
    );
}

export default App;
