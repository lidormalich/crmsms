import { FunctionComponent, useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Book from "../interfaces/Book";
import { addBook } from "../services/bookServices";
import { successMessage } from "../services/FeedbackService";

interface AddbookProps {
    setBooksChanged: Function;
    booksChange: boolean;
}

const Addbook: FunctionComponent<AddbookProps> = ({ setBooksChanged, booksChange }) => {
    let formik = useFormik({
        initialValues: { name: "", author: "", genre: "", price: 0 },
        validationSchema: yup.object({
            name: yup.string().required().min(2),
            author: yup.string().required().min(2),
            genre: yup.string().required().min(2),
            price: yup.number().required().positive(),

        }),
        onSubmit: (values: Book, { resetForm }) => {
            addBook(values).then((res) => {
                successMessage("Event Added");
                resetForm();
                // שינוי תצוגה מ0 אל כלום
                formik.setFieldValue("price", "")
                // רענון
                setBooksChanged(!booksChange);
            })
                .catch((e) => console.log(e))
        }
    })

    // שינוי תצוגה מ0 אל כלום
    useEffect(() => {
        formik.setFieldValue("price", "")
    }, []);
    return (<>
        <div>
            <h5 className="display-5">Add Book</h5>
            <form onSubmit={formik.handleSubmit}>
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


                <button type="submit" className="btn btn-warning w-100 my-3"
                    disabled={!formik.isValid || !formik.dirty}><i className="fa-solid fa-plus"></i>  ADD</button>
            </form>
        </div>

    </>);
}

export default Addbook;