import React from 'react';
import './App.css';
import Header from "./component/Header";
import BooKGallery from "./component/BooKGallery";
import {Alert} from "@mui/material";
import {AddBook} from "./component/AddBook";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {LoginPage} from "./component/LoginPage";
import {BookDetails} from "./component/BookDetails";
import useUser from "./hook/useUser";
import {useBook} from "./hook/useBook";
import {EditBook} from "./component/EditBook";
import {LogoutPage} from "./component/LogoutPage";
import PrimarySearchAppBar from "./component/PrimarySearchAppBar";


function App() {
    const {login, logout} = useUser();
    const {onTextChange, filteredBooks, text, addBook, deleteBook, updateBook} = useBook();
    return (
        <div className="App">
            <PrimarySearchAppBar text={text} onTextChange={onTextChange}/>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/login" element={<LoginPage onLogin={login}/>}>
                    </Route>
                    <Route path="/" element={<Navigate to="/books"/>}>
                    </Route>
                    <Route path="/logout" element={<LogoutPage onLogout={logout}/>}>
                    </Route>
                    <Route path='/books' element={
                        <div>
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
                    <Route path="/books/edit/:id" element={<EditBook updateBook={updateBook}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
