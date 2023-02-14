import { FunctionComponent, useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { successMessage } from "../services/FeedbackService";
import People from "../interfaces/People";
import { addPeopleToEvent } from "../services/eventServices";

interface AddbookProps {
    setpeopleChanged: Function;
    peopleChange: boolean;
    id: string;
}

const Addbook: FunctionComponent<AddbookProps> = ({ setpeopleChanged, peopleChange, id }) => {
    let formik = useFormik({
        initialValues: { phoneNumber: "", firstName: "", lastName: "", NumberOfGuests: 0, NumberOfGuestsAccept: 0 },
        validationSchema: yup.object({
            phoneNumber: yup.string().required().min(2),
            firstName: yup.string().required().min(2),
            lastName: yup.string().required().min(2),
            NumberOfGuests: yup.number().required().positive(),
            NumberOfGuestsAccept: yup.number().required().positive(),

        }),
        onSubmit: (values: People, { resetForm }) => {
            addPeopleToEvent(id, values).then((res) => {
                successMessage("Event Added");
                resetForm();

                // רענון
                setpeopleChanged(!peopleChange);
            })
                .catch((e) => console.log(e))
        }
    })


    return (<>
        <div>
            <h5 className="">Add Guest- pepole interface</h5>
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
                {/* <div className="form-floating mb-3">

                    <select className="form-select"
                        id="genre"
                        placeholder="name@example.com"
                        name="genre"
                        value={formik.values.genre}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        aria-label="Default select example">
                        //  הסתרה וגם בחירה 
                        <option hidden selected>Select Book Genre</option>
                        <option value="Novel">Novel</option>
                        <option value="Biography">Biography</option>
                        <option value="Kids">Kids</option>
                    </select>
                    <label htmlFor="genre">Book Genre</label>
                    {formik.touched.genre && formik.errors.genre && (
                        <small className="text-danger">{formik.errors.genre}</small>
                    )}
                </div> */}



                <button type="submit" className="btn btn-warning w-100 my-3"
                    disabled={!formik.isValid || !formik.dirty}><i className="fa-solid fa-plus"></i>  ADD</button>
            </form>
        </div>

    </>);
}

export default Addbook;