import BookCard from "./BookCard";
import {BookArt} from "./BookArt";
import {Book} from "./BookModel";

type BookGalleryProps = {
    books: Book[],
    addBook: (book: Book) => void;
    updateBook: (book: Book) => void;
    deleteBook: (isbn: string) => void;
}

export default function BooKGallery(props: BookGalleryProps) {

    const selectedBooks: Book[] = props.books.filter((book) => (book.art === BookArt.HARDCOVER ||
        book.art === BookArt.AUDIOBOOK || book.art === BookArt.SOFTCOVER || book.art === BookArt.EBOOK));

    return (
        <div className="book-gallery">

            {selectedBooks.map((book) => {
                return <BookCard key={book.id} book={book} addBook={props.addBook}
                                 updateBook={props.updateBook} deleteBook={props.deleteBook}/>
            })}
        </div>)
}