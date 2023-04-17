import {Button, Card, CardContent, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Book} from "./BookModel";

type BookCardProps = {
    book: Book,
    addBook: (book: Book) => void;
    updateBook: (book: Book) => void;
    deleteBook: (isbn: string) => void;

}
export default function BookCard(props: BookCardProps) {
    const navi = useNavigate();
    const onClick = () => {
        props.deleteBook(props.book.id);
    }
    const toDetail = () => {
        navi("/books/" + props.book.id)
    }

    return (
        <div>
            <Card variant="elevation" style={{backgroundColor: 'cyan', marginTop: "20px"}}>
                <CardContent>
                    <Typography variant="h5" component="h3">
                        <p>{props.book.art}</p>
                    </Typography>
                    <Typography color="textSecondary">
                        <p className="p-font">{props.book.isbn}</p>
                        <p className="p-font">{props.book.title}</p>
                        <p className="p-font">{props.book.author}</p>
                    </Typography>
                </CardContent>
                <Button variant="outlined" onClick={toDetail}>Detail</Button>
                <Button variant="contained" onClick={onClick}>Delete</Button>
            </Card>
        </div>
    )

}