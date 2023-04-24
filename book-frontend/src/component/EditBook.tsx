import {Book} from "../model/BookModel";
import {Button, Card, FormControl, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {BookArt} from "../model/BookArt";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

type EditBookProps = {
    updateBook: (book: Book) => void;
}

export const EditBook = (props: EditBookProps) => {
    const initial: Book = {
        id: "", isbn: "", title: "", author: "", instant: new Date(), art: BookArt.EBOOK
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
                id: id, instant: new Date(),
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
                id: id, instant: new Date(),
                [targetName]: value
            })
        }
    }

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        if (bookToUpdate.isbn && bookToUpdate.author && bookToUpdate.title && bookToUpdate.art) {
            event.preventDefault();
            props.updateBook(bookToUpdate)
            navigate('/books')
        }

    }


    return (
        <div className="form">
            <Card variant="outlined" style={{backgroundColor: 'cyan'}} className="card">
                <FormControl component="form" onSubmit={onSubmit}>
                    <TextField
                        name="isbn"
                        value={bookToUpdate?.isbn}
                        required
                        label="ISBN"
                        onChange={onChange}
                        placeholder="ISBN"
                        style={{marginBottom: '10px'}}
                    />
                    <TextField
                        name="title"
                        value={bookToUpdate?.title}
                        required
                        label="Title"
                        onChange={onChange}
                        placeholder="Title"
                        style={{marginBottom: '10px'}}
                    />
                    <TextField
                        name="author"
                        value={bookToUpdate?.author}
                        required
                        label="Author"
                        onChange={onChange}
                        placeholder="Author"
                        style={{marginBottom: '10px'}}
                    />
                    <Select
                        id="demo-simple-select"
                        value={bookToUpdate?.art}
                        required
                        label="BookArt"
                        name="art"
                        onChange={handleChange}
                    >
                        <MenuItem value={BookArt.EBOOK} style={{backgroundColor: 'cyan'}}>EBOOK</MenuItem>
                        <MenuItem value={BookArt.HARDCOVER} style={{backgroundColor: 'cyan'}}>HARDCOVER</MenuItem>
                        <MenuItem value={BookArt.SOFTCOVER} style={{backgroundColor: 'cyan'}}>SOFTCOVER</MenuItem>
                        <MenuItem value={BookArt.AUDIOBOOK} style={{backgroundColor: 'cyan'}}>AUDIOBOOK</MenuItem>
                    </Select>
                    <Button variant="contained" type="submit" size="small">
                        Save
                    </Button>
                </FormControl>
            </Card>
        </div>
    );
}