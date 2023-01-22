import { channel } from "diagnostics_channel";
import { FunctionComponent, useEffect, useState } from "react";
import Book from "../interfaces/Book";
import { getBook } from "../services/bookServices";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";

interface BooktableProps {
    booksChange: boolean;
    setBooksChanged: Function;

}

const Booktable: FunctionComponent<BooktableProps> = ({ booksChange, setBooksChanged }) => {
    let [booksarr, setbooks] = useState<Book[]>([]);

    // Open Modal
    let [opendeleteModal, setOpendeleteModal] = useState<boolean>(false);
    let [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
    let [id, setId] = useState<number>(0);

    let refresh = () => {
        setBooksChanged(!booksChange);
    }

    // רענון --הוספת הדיפנדנסיס בלבד
    useEffect(() => {
        getBook().then((res) => {
            setbooks(res.data);
        }).catch((e) => console.log(e))
    }, [booksChange]);




    return (<>
        <h5 className="display-5">OUR BOOKS</h5>

        {booksarr.length ? (<table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Genre</th>
                    <th>Price</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {booksarr.map((book: Book) => <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.name}</td>
                    <td>{book.author}</td>
                    <td>{book.genre}</td>
                    <td>{book.price}</td>
                    <td onClick={() => {
                        setId(book.id as number)
                        setOpenUpdateModal(true);
                    }}><i className="fa-solid fa-pen text-success"></i></td>
                    <td onClick={() => {
                        setId(book.id as number);
                        setOpendeleteModal(true);
                    }}><i className="fa-solid fa-trash-can text-danger"></i></td>
                </tr>)}
            </tbody>
        </table>) : (<h3> No Books</h3>)}
        <DeleteModal show={opendeleteModal} onHide={() => setOpendeleteModal(false)} id={id} refresh={refresh} />
        <UpdateModal show={openUpdateModal} onHide={() => setOpenUpdateModal(false)} id={id} refresh={refresh} />
    </>);
}

export default Booktable;