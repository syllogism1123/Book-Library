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
            loadBookByIsbn(id)
        }
    }, [])

    function loadBookByIsbn(isbn: string) {
        axios.get('/api/books/' + isbn)
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