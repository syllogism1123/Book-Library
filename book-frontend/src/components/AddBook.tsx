import {FormEvent, useState} from "react";
import "./AddBook.css"
import {NewBook} from "../model/Book";
import {useNavigate} from "react-router-dom";

type AddBookProps = {
    addBook: (newBook: NewBook) => void
}
export default function AddBook(props: AddBookProps) {

    const initialState: string = ""
    const [isbn, setIsbn] = useState<string>(initialState);
    const [title, setTitle] = useState<string>(initialState);
    const [author, setAuthor] = useState<string>(initialState);
    const [art, setArt] = useState<string>(initialState);

    const navigate = useNavigate()

    function onSaveBook(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (title === undefined || title === '') {
            console.error("Title required")
            return
        }
        const newBook: NewBook = {isbn: isbn, title: title, author: author, art: "EBOOK"};
        props.addBook(newBook);
        navigate("/books")
    }

    return (
        <div className="addBook">
            <form onSubmit={onSaveBook}>
                <input className="addInput" type="text" name="isbn" value={isbn} onChange={(event) => {
                    setIsbn(event.target.value)
                }}/>ISBN
                <input className="addInput" type="text" name="title" value={title} onChange={(event) => {
                    setTitle(event.target.value)
                }}/>Title
                <input className="addInput" type="text" name="author" value={author} onChange={(event) => {
                    setAuthor(event.target.value)
                }}/>Author

                <select className="addInput" name="artr" value={art} onChange={(event) => {
                    setArt(event.target.value)
                }}>
                    <option value="ebook">EBOOK</option>
                    <option value="audiobook">AUDIOBOOK</option>
                    <option value="softcover">SOFTCOVER</option>
                    <option value="hardcover">HARDCOVER</option>
                </select>
                <button className="addBtn">Add</button>
            </form>

        </div>
    )
}