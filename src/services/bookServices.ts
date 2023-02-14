import axios from "axios";
import Book from "../interfaces/Book";


const api: string = `${process.env.REACT_APP_API}/books` || "";

// get all books
export function getBook() {
    return axios.get(api);
}

// get book by id
export function getBookByID(id: number) {
    return axios.get(`${api}/${id}`);
}

// add new book
export function addBook(bookToadd: Book) {
    return axios.post(api, bookToadd);
}
// update book
export function updateBook(id: number, bookToUpdate: Book) {
    return axios.put(`${api}/${id}`, bookToUpdate);
}
// delete book
export function deleteBook(id: string) {
    return axios.delete(`${api}/${id}`);
}