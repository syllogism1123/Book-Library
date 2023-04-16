export type Book = {
    id: string,
    isbn: string,
    title: string,
    author: string,
    art: "SOFTCOVER" | "EBOOK" | "HARDCOVER" | "AUDIOBOOK"
}

export type NewBook = {
    isbn: string,
    title: string,
    author: string,
    art: "SOFTCOVER" | "EBOOK" | "HARDCOVER" | "AUDIOBOOK"
}