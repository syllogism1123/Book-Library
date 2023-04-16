import {Book} from "../model/Book";
import BookCard from "./BookCard";


type Props = {
    books: Book[]
}

export default function BookGallery(props: Props) {
    return (
        <div className='Book-gallery'>
            <div>
                <h2>All Books</h2>
                {
                    props.books.map((book) => <BookCard key={book.id}
                                                        book={book}/>)
                }
            </div>


        </div>
    )
}