import {BookModel} from "./BookModel";
import {Button, Card, FormControl, MenuItem, Select,TextField} from "@mui/material";
import React from "react";
import {BookArt} from "./BookArt";


type EditBookProps = {
    updateBook: (book: BookModel) => void;
}

export const EditBook = (props: EditBookProps) => {


    return (
        <div className="form">
            <Card variant="outlined" style={{backgroundColor: 'cyan'}}>
                <FormControl component="form" onSubmit={onSubmit}>
                    <TextField
                        name="isbn"
                        value={book.isbn}
                        onChange={onChange}
                        placeholder="ISBN"
                        style={{marginBottom: '10px'}}
                    />
                    <TextField
                        name="title"
                        value={book.title}
                        onChange={onChange}
                        placeholder="Title"
                        style={{marginBottom: '10px'}}
                    />
                    <TextField
                        name="author"
                        value={book.author}
                        onChange={onChange}
                        placeholder="Author"
                        style={{marginBottom: '10px'}}
                    />
                    <Select
                        id="demo-simple-select"
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