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
        axios.get("/api/books")
            .then(response => setBooks(response.data))
            .catch(reason => console.error(reason));
    }

    const addBook = (newBook: BookModel) => {
        axios.post("/api/books", newBook)
            .then(() => loadAllBooks())
            .catch(reason => console.error(reason));
    }

    const updateBook = (book: Book) => {
        axios.put(`/api/books/${book.id}`, book)
            .then(response => {
                setBooks(books.map((currentBook) => {
                    if (currentBook.id === book.id) {
                        return response.data;
                    } else {
                        return currentBook;
                    }
                }))
            })
            .then(() => loadAllBooks())
            .catch(reason => console.error(reason));
    }

    const deleteBook = (id: string) => {
        axios.delete(`/books/${id}`)
            .then(() => {
                    setBooks(books.filter((book) => book.id !== id))
                }
            )
            .then(() => loadAllBooks())
            .catch(reason => console.error(reason));
    }

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
