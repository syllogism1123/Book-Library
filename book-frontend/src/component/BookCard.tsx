import {Button, Card, CardContent, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Book} from "./BookModel";

type BookCardProps = {
    book: Book,
    addBook: (book: Book) => void;
    updateBook: (book: Book) => void;
    deleteBook: (id: string) => void;

}
export default function BookCard(props: BookCardProps) {
    const navi = useNavigate();
    const onClick = () => {
        props.deleteBook(props.book.id);
    }
    const toDetail = () => {
        navi("/books/" + props.book.id)
    }
    const toEdit = () => {
        navi("/books/edit/" + props.book.id)
    }

    return (

        <Card variant="elevation" style={{backgroundColor: 'cyan', marginTop: "20px"}}>
            <CardContent>
                <Typography variant="h5" component="h3">
                    {props.book.art}
                </Typography>
                <Typography className="p-font">{props.book.isbn}</Typography>
                <Typography className="p-font">{props.book.title}</Typography>
                <Typography className="p-font">{props.book.author}</Typography>

            </CardContent>
            <Button variant="outlined" onClick={toDetail}>Detail</Button>
            <Button variant="outlined" onClick={toEdit}>Edit</Button>
            <Button variant="contained" onClick={onClick}>Delete</Button>
        </Card>

    )

}