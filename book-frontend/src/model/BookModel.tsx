import {BookArt} from "./BookArt";

export  type Book = {
    id: string,
    isbn: string,
    title: string,
    author: string,
    instant: Date,
    art: BookArt;
    userId?: string
}


export  type BookModel = {
    isbn: string,
    title: string,
    author: string,
    instant: Date,
    art: BookArt;
    userId?: string
}