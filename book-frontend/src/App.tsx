import React, {useState, useEffect} from 'react';
import './App.css';
import './components/BookCard';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import axios from "axios";
import BookGallery from "./components/BookGallery";
import LoginPage from "./components/LoginPage";
import Header from "./components/Header";
import useUser from "./components/useUser";
import {NewBook, Book} from "./model/Book";
import AddBook from "./components/AddBook";

function App() {
    const {login} = useUser()
    const [books, setBooks] = useState<Book[]>([])


    function allBooks() {
        axios.get("http://localhost:8080/api/books")
            .then((response => {
                setBooks(response.data)
            }))
            .catch(() => {
                console.error()
            })
    }

    function addBook(BookToAdd: NewBook) {
        axios.post("http://localhost:8080/api/books", BookToAdd)
            .then((addBookResponse) => {

                setBooks([...books, addBookResponse.data])
            })
            .catch((error) => {
                error("Unknown Error, try again later! " + error.response.statusText, {autoClose: 10000})
            })
    }

    useEffect(() => {
        allBooks()
    }, [])

    return (
        <BrowserRouter>
            <Header/>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<LoginPage onLogin={login}/>}/>
                    <Route path="/books" element={<BookGallery books={books}/>}/>
                    <Route path='/books/add'
                           element={<AddBook addBook={addBook}/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
