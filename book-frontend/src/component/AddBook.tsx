import {BookModel} from "../model/BookModel";
import {Button, Card, FormControl, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {BookArt} from "../model/BookArt";
import {useNavigate} from "react-router-dom";

type AddBookProps = {
    addBook: (book: BookModel) => void;
}

export const AddBook = (props: AddBookProps) => {
    const initial: BookModel = {
        isbn: "", title: "", author: "", instant: new Date(), art: BookArt.EBOOK
    }
    const [book, setBook] = useState<BookModel>(initial);

    const navigate = useNavigate();

    const handleChange = (event: SelectChangeEvent) => {
        const selectedBookArt: BookArt = event.target.value as BookArt;
        setBook({
            ...book, instant: new Date(),
            art: selectedBookArt
        });
    };

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        const targetName: string = event.target.name;
        const value: string = event.target.value;
        setBook({
            ...book, instant: new Date(),
            [targetName]: value
        })
    }


    function onSubmit(event: FormEvent<HTMLFormElement>) {
        if (book.isbn && book.author && book.title && book.art) {
            event.preventDefault();
            props.addBook(book)
            setBook(initial);
            navigate('/books')
        }

    }


    return (
        <div className="form">
            <Card variant="outlined" style={{backgroundColor: 'cyan'}}>
                <FormControl component="form" onSubmit={onSubmit}>
                    <TextField
                        name="isbn"
                        value={book.isbn}
                        required={true}
                        onChange={onChange}
                        placeholder="ISBN"
                        style={{marginBottom: '10px'}}
                    />
                    <TextField
                        name="title"
                        value={book.title}
                        required={true}
                        onChange={onChange}
                        placeholder="Title"
                        style={{marginBottom: '10px'}}
                    />
                    <TextField
                        name="author"
                        value={book.author}
                        required={true}
                        onChange={onChange}
                        placeholder="Author"
                        style={{marginBottom: '10px'}}
                    />
                    <Select
                        id="demo-simple-select"
                        required={true}
                        value={book.art}
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