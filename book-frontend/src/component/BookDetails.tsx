import {Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {BookModel} from "../model/BookModel";
import {useParams} from "react-router-dom";
import axios from "axios";

export const BookDetails = () => {
    const [book, setBook] = useState<BookModel>()
    const {id} = useParams<{ id: string }>();
    const loadBookById = (id: string) => {
        axios.get('http://localhost:8080/api/books/' + id, {
            withCredentials: true
        })
            .then((response) => {
                setBook(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }
    useEffect(() => {
        if (id) {
            loadBookById(id)
        }
    }, [])


    return (
        <div>
            <Typography className="p-font">ISBN: {book?.isbn}</Typography>
            <Typography className="p-font">Title: {book?.title}</Typography>
            <Typography className="p-font">Author: {book?.author}</Typography>
            <Typography
                className="p-font">Date: {book?.instant && new Date(book.instant).toLocaleString()}</Typography>
            <Typography className="p-font">BookArt: {book?.art}</Typography>
        </div>
    );
}