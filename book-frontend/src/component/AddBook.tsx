import {BookModel} from "./BookModel";
import {Button, Card, FormControl,TextField} from "@mui/material";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {BookArt} from "./BookArt";
import {useNavigate} from "react-router-dom";

type AddBookProps = {
    addBook: (book: BookModel) => void;
}

export const AddBook = (props: AddBookProps) => {
    const initialState: BookModel = {
        isbn: "", title: "", author: "", art: BookArt.AUDIOBOOK
    }
    const [book, setBook] = useState<BookModel>(initialState);

    const navigate=useNavigate();

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        const targetName: string = event.target.name;
        const value: string = event.target.value;
        setBook({
            ...book,
            [targetName]: value
        })
    }

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        if (book.isbn && book.author && book.title && book.art) {
            event.preventDefault();
            props.addBook(book)
            setBook(initialState);
        }
        navigate('/books')
    }


    return (
        <div className="form">
            <Card variant="outlined" style={{ backgroundColor: 'cyan' }}>
                <FormControl component="form" onSubmit={onSubmit}>
                    <TextField
                        name="isbn"
                        value={book.isbn}
                        onChange={onChange}
                        placeholder="ISBN"
                        style={{ marginBottom: '10px' }}
                    />
                    <TextField
                        name="title"
                        value={book.title}
                        onChange={onChange}
                        placeholder="Title"
                        style={{ marginBottom: '10px' }}
                    />
                    <TextField
                        name="author"
                        value={book.author}
                        onChange={onChange}
                        placeholder="Author"
                        style={{ marginBottom: '10px' }}
                    />
                    <Button variant="contained" type="submit" size="small">
                        Save
                    </Button>
                </FormControl>
            </Card>
        </div>
    );


}