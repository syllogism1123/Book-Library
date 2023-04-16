import {Book} from "../model/Book";

type Props = {
    book: Book
}

export default function BookCard(props: Props) {
    return (
        <div className='Book-card'>
            <p>{props.book.id}</p>
            <p>{props.book.title}</p>
            <p>{props.book.isbn}</p>
            <p>{props.book.art}</p>
        </div>
    )
}