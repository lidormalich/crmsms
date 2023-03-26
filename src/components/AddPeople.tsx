import { FunctionComponent, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { successMessage } from "../Services/FeedbackService";
import People from "../interfaces/People";
import { addPeopleToEvent } from "../Services/eventServices";
import { getAllGroup } from "../Services/GroupServices";
import Group from "../interfaces/Group";
import { useParams } from "react-router-dom";
import GloabSeclModal from "./GloabSeclModal";

interface AddPeopleProps {
    setpeopleChanged: Function;
    peopleChange: boolean;
}

const AddPeople: FunctionComponent<AddPeopleProps> = ({ setpeopleChanged, peopleChange }) => {
    let [allGroup, setAllGroup] = useState<Group[]>([]);
    let [openSecModal, setOpenSecModal] = useState<boolean>(false);
    let { eventId } = useParams();
    let counter: number = 0;
    useEffect(() => {
        getAllGroup(eventId as string).then((res) => setAllGroup(res.data)).catch((e) => console.log(e));
    }, []);
    let formik = useFormik({
        initialValues: { phoneNumber: "", firstName: "", lastName: "", NumberOfGuests: 0, NumberOfGuestsAccept: 0, eventGroupName: "" },
        validationSchema: yup.object({
            phoneNumber: yup.string().required().min(2),
            firstName: yup.string().required().min(2),
            lastName: yup.string().required().min(2),
            NumberOfGuests: yup.number().required().positive(),
            // NumberOfGuestsAccept: yup.number().required().positive(),
            eventGroupName: yup.string().required(),

        }),
        onSubmit: (values: People, { resetForm }) => {
            addPeopleToEvent(eventId as string, values).then((res) => {
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
                    <label htmlFor="phoneNumber">Phone Number</label>
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
                    <span >
                        <button className="w-25 btn btn-outline-primary " onClick={() => { setOpenSecModal(true) }}>add Group</button>
                        <select defaultValue={'DEFAULT'}
                            className="form-control"
                            id="eventGroupName"
                            placeholder="textme"
                            name="eventGroupName"
                            value={formik.values.eventGroupName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}>
                            <option hidden >Choose a Group...</option>
                            {/* {allGroup.length === 0 && <option value="DEFAULT" disabled >Need Add a Group...</option>} */}
                            {allGroup.map((groupname: Group) => <option key={counter++} value={groupname.eventGroupName}> {groupname.eventGroupName}</option>)}
                            {/* <option onClick={() => setOpenSecModal(true)} >add Group</option> */}
                        </select>
                    </span>
                    {/* <label htmlFor="eventGroupName">Group</label> */}
                    {formik.touched.eventGroupName && formik.errors.eventGroupName && (
                        <small className="text-danger">{formik.errors.eventGroupName}</small>
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
                    <label htmlFor="NumberOfGuests">Number Of Guests Come</label>
                    {formik.touched.NumberOfGuests && formik.errors.NumberOfGuests && (
                        <small className="text-danger">{formik.errors.NumberOfGuests}</small>
                    )}
                </div>

                <button type="submit" className="btn btn-warning w-100 my-3"
                    disabled={!formik.isValid || !formik.dirty}><i className="fa-solid fa-plus"></i>  ADD</button>
            </form>
        </div >
        <GloabSeclModal show={openSecModal} onHide={() => setOpenSecModal(false)} groupChange={peopleChange} setGroupChanged={setpeopleChanged} />
    </>);
}

export default AddPeople;