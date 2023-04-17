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
    const eBooks: Book[] = props.books.filter((book) => (book.art === BookArt.EBOOK));
    const audioBooks: Book[] = props.books.filter((book) => (book.art === BookArt.AUDIOBOOK));
    const softCovers: Book[] = props.books.filter((book) => (book.art === BookArt.SOFTCOVER));
    const hardCovers: Book[] = props.books.filter((book) => (book.art === BookArt.HARDCOVER));


    return (
        <div className="book-gallery">

            <div>
                {
                    eBooks.map((book) => {
                        return <BookCard key={book.isbn} book={book} addBook={props.addBook}
                                         updateBook={props.updateBook} deleteBook={props.deleteBook}/>
                    })
                }
            </div>
            <div>
                {
                    audioBooks.map((book) => {
                        return <BookCard key={book.isbn} book={book} addBook={props.addBook}
                                         updateBook={props.updateBook} deleteBook={props.deleteBook}/>
                    })
                }
            </div>
            <div>
                {
                    softCovers.map((book) => {
                        return <BookCard key={book.isbn} book={book} addBook={props.addBook}
                                         updateBook={props.updateBook} deleteBook={props.deleteBook}/>
                    })
                }
            </div>
            <div>
                {
                    hardCovers.map((book) => {
                        return <BookCard key={book.isbn} book={book} addBook={props.addBook}
                                         updateBook={props.updateBook} deleteBook={props.deleteBook}/>
                    })
                }
            </div>

        </div>)
}