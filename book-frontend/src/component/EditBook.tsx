import {Book} from "./BookModel";
import {Button, Card, FormControl, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {BookArt} from "./BookArt";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

type EditBookProps = {
    updateBook: (book: Book) => void;
}

export const EditBook = (props: EditBookProps) => {
    const initial: Book = {
        id: "", isbn: "", title: "", author: "", art: BookArt.EBOOK
    }
    const [bookToUpdate, setBookToUpdate] = useState<Book>(initial);
    const {id} = useParams<{ id: string }>();
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
                setBookToUpdate(response.data)
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


    const navigate = useNavigate();

    const handleChange = (event: SelectChangeEvent) => {
        const selectedBookArt: BookArt = event.target.value as BookArt;
        if (id) {
            setBookToUpdate({
                ...bookToUpdate,
                id: id,
                art: selectedBookArt
            });
        }

    };

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        const targetName: string = event.target.name;
        const value: string = event.target.value;
        if (id) {
            setBookToUpdate({
                ...bookToUpdate,
                id: id,
                [targetName]: value
            })
        }
    }


    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        props.updateBook(bookToUpdate)
        navigate('/books')
    }


    return (
        <div className="form">
            <Card variant="outlined" style={{backgroundColor: 'cyan'}}>
                <FormControl component="form" onSubmit={onSubmit}>
                    <TextField
                        name="isbn"
                        value={bookToUpdate?.isbn}
                        onChange={onChange}
                        placeholder={bookToUpdate?.isbn}
                        style={{marginBottom: '10px'}}
                    />
                    <TextField
                        name="title"
                        value={bookToUpdate?.title}
                        onChange={onChange}
                        placeholder={bookToUpdate?.title}
                        style={{marginBottom: '10px'}}
                    />
                    <TextField
                        name="author"
                        value={bookToUpdate?.author}
                        onChange={onChange}
                        placeholder={bookToUpdate?.author}
                        style={{marginBottom: '10px'}}
                    />
                    <Select
                        id="demo-simple-select"
                        value={bookToUpdate?.art}
                        label="BookArt"
                        name="art"
                        onChange={handleChange}
                    >
                        <MenuItem value={BookArt.EBOOK}>EBOOK</MenuItem>
                        <MenuItem value={BookArt.HARDCOVER}>HARDCOVER</MenuItem>
                        <MenuItem value={BookArt.SOFTCOVER}>SOFTCOVER</MenuItem>
                        <MenuItem value={BookArt.AUDIOBOOK}>AUDIOBOOK</MenuItem>
                    </Select>
                    <Button variant="contained" type="submit" size="small">
                        Save
                    </Button>
                </FormControl>
            </Card>
        </div>
    );


}