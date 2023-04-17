import {BookModel} from "./BookModel";
import {Typography} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";


export const BookDetails = () => {
    const [book, setBook] = useState<BookModel>()
    const {id} = useParams<{ id: string }>()

    useEffect(() => {
        if (id) {
            loadBookById(id)
        }
    }, [])

    const loadBookById = (id: string) => {
        const authToken = localStorage.getItem('authToken');
        axios.get('http://localhost:8080/api/books/' + id, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
            withCredentials: true
        })
            .then((response) => {
                setBook(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <div>
            <Typography className="p-font">ISBN: {book?.isbn}</Typography>
            <Typography className="p-font">Title: {book?.title}</Typography>
            <Typography className="p-font">Author: {book?.author}</Typography>
            <Typography className="p-font">BookArt: {book?.art}</Typography>
        </div>
    );
}