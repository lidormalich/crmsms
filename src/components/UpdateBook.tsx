import { FunctionComponent, useEffect, useState } from "react";
import { getBookByID, updateBook } from "../services/bookServices";
import * as yup from "yup";
import { useFormik } from "formik";
import Book from "../interfaces/Book";
import { Button } from "react-bootstrap";
import { successMessage } from "../services/FeedbackService";

interface UpdateBookProps {
    id: number;
    refresh: Function;
    onHide: Function;
}

const UpdateBook: FunctionComponent<UpdateBookProps> = ({ id, refresh, onHide }) => {
    let [userBook, setUserBook] = useState<Book>({
        name: "",
        author: "",
        genre: "",
        price: 0,
    });
    useEffect(() => {
        getBookByID(id).then((res) => setUserBook(res.data)).catch((e) => console.log(e));
        formik.setFieldValue("price", "")
    }, []);



    let formik = useFormik({
        initialValues: { name: userBook.name as string, author: userBook.author as string, genre: userBook.genre as string, price: userBook.price as number },
        enableReinitialize: true,
        validationSchema: yup.object({
            name: yup.string().required().min(2),
            author: yup.string().required().min(2),
            genre: yup.string().required().min(2),
            price: yup.number().required().positive(),
        }),
        onSubmit: (values: Book) => {
            updateBook(id, values).then((res) => {
                onHide();
                successMessage("Book data change and save");
                refresh();
            })
                .catch((e) => console.log(e))
        }
    })
    return (<>
        <div>
            <h5 className="display-5"> Update Book {userBook.name}</h5>
            <form onSubmit={formik.handleSubmit} className="">
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="bookname"
                        placeholder="Harry Potter"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="bookname">Book Name</label>
                    {formik.touched.name && formik.errors.name && (
                        <small className="text-danger">{formik.errors.name}</small>
                    )}
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="author"
                        placeholder="textme"
                        name="author"
                        value={formik.values.author}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="author">Book Author</label>
                    {formik.touched.author && formik.errors.author && (
                        <small className="text-danger">{formik.errors.author}</small>
                    )}
                </div>
                <div className="form-floating mb-3">

                    <select className="form-select"
                        id="genre"
                        placeholder="name@example.com"
                        name="genre"
                        value={formik.values.genre}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        aria-label="Default select example">
                        {/* הסתרה וגם בחירה */}
                        <option hidden selected>Select Book Genre</option>
                        <option value="Novel">Novel</option>
                        <option value="Biography">Biography</option>
                        <option value="Kids">Kids</option>
                    </select>
                    <label htmlFor="genre">Book Genre</label>
                    {formik.touched.genre && formik.errors.genre && (
                        <small className="text-danger">{formik.errors.genre}</small>
                    )}
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        placeholder="name@example.com"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="price">Book Price</label>
                    {formik.touched.price && formik.errors.price && (
                        <small className="text-danger">{formik.errors.price}</small>
                    )}
                </div>

                <hr />

                <Button variant="success" type="submit" className="btn btn-success w-100 my-3"
                    disabled={!formik.isValid || !formik.dirty}><i className="fa-solid fa-floppy-disk"></i>  Save Change</Button>
            </form>
        </div>

    </>);
}

export default UpdateBook;