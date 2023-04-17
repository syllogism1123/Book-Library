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
            <Typography color="textSecondary">
                <p className="p-font">{book?.isbn}</p>
                <p className="p-font">{book?.title}</p>
                <p className="p-font">{book?.author}</p>
                <p className="p-font">{book?.art}</p>
            </Typography>
        </div>
    );
}