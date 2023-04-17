import {BookArt} from "./BookArt";

export  type Book= {
    id:string,
    isbn: string,
    title: string,
    author: string,
    art: BookArt;
}



export  type BookModel = {
    isbn: string,
    title: string,
    author: string,
    art: BookArt;
}