import {BookModel} from "./BookModel";
import BookCard from "./BookCard";
import {BookArt} from "./BookArt";

type BookGalleryProps = {
    books: BookModel[],
    addBook: (book: BookModel) => void;
    updateBook: (book: BookModel) => void;
    deleteBook: (isbn: string) => void;
}

export default function BooKGallery(props: BookGalleryProps) {
    const eBooks: BookModel[] = props.books.filter((book) => (book.art === BookArt.EBOOK));
    const audioBooks: BookModel[] = props.books.filter((book) => (book.art === BookArt.AUDIOBOOK));
    const softCovers: BookModel[] = props.books.filter((book) => (book.art === BookArt.SOFTCOVER));
    const hardCovers: BookModel[] = props.books.filter((book) => (book.art === BookArt.HARDCOVER));


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