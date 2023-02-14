import { FunctionComponent, useEffect, useState } from "react";
import { getBookByID, updateBook } from "../services/bookServices";
import * as yup from "yup";
import { useFormik } from "formik";
import Book from "../interfaces/Book";
import { Button } from "react-bootstrap";
import { successMessage } from "../services/FeedbackService";
import People from "../interfaces/People";
import { updatePeopleInEvent } from "../services/eventServices";

interface UpdateBookProps {
    id: string;
    refresh: Function;
    onHide: Function;
}

const UpdateBook: FunctionComponent<UpdateBookProps> = ({ id, refresh, onHide }) => {
    let [userBook, setUserBook] = useState<People>({
        // id?: number,
        phoneNumber: "",
        firstName: "",
        lastName: "",
        NumberOfGuests: 0,
        NumberOfGuestsAccept: 0,
    });
    useEffect(() => {
        // getBookByID(id).then((res) => setUserBook(res.data)).catch((e) => console.log(e));
    }, []);



    let formik = useFormik({
        initialValues: { phoneNumber: "", firstName: "", lastName: "", NumberOfGuests: 0, NumberOfGuestsAccept: 0 },
        enableReinitialize: true,
        validationSchema: yup.object({
            name: yup.string().required().min(2),
            author: yup.string().required().min(2),
            genre: yup.string().required().min(2),
            price: yup.number().required().positive(),
        }),
        onSubmit: (values: People) => {
            updatePeopleInEvent(id + "", values).then((res) => {
                onHide();
                successMessage("Book data change and save");
                refresh();
            })
                .catch((e) => console.log(e))
        }
    })
    return (<>
        <div>
            <h5 className="display-5"> Update Book { }</h5>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-floating mb-3">
                    <input
                        type="tel"
                        className="form-control"
                        id="phoneNumber"
                        placeholder="Harry Potter"
                        name="phoneNumber"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="bookname">Phone Number</label>
                    {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                        <small className="text-danger">{formik.errors.phoneNumber}</small>
                    )}
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="textme"
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="firstName">First Name</label>
                    {formik.touched.firstName && formik.errors.firstName && (
                        <small className="text-danger">{formik.errors.firstName}</small>
                    )}
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder="textme"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="lastName">Last Name</label>
                    {formik.touched.lastName && formik.errors.lastName && (
                        <small className="text-danger">{formik.errors.lastName}</small>
                    )}
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="number"
                        className="form-control"
                        id="NumberOfGuests"
                        placeholder="textme"
                        name="NumberOfGuests"
                        value={formik.values.NumberOfGuests}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="NumberOfGuests">Number Of Guests Accept</label>
                    {formik.touched.NumberOfGuests && formik.errors.NumberOfGuests && (
                        <small className="text-danger">{formik.errors.NumberOfGuests}</small>
                    )}
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="number"
                        className="form-control"
                        id="NumberOfGuestsAccept"
                        placeholder="textme"
                        name="NumberOfGuestsAccept"
                        value={formik.values.NumberOfGuestsAccept}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="NumberOfGuestsAccept">Number Of Guests Accept</label>
                    {formik.touched.NumberOfGuestsAccept && formik.errors.NumberOfGuestsAccept && (
                        <small className="text-danger">{formik.errors.NumberOfGuestsAccept}</small>
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