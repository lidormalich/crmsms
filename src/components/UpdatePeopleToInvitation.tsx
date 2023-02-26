import { FunctionComponent, useEffect, useState } from "react";
import * as yup from "yup";
import { successMessage } from "../services/FeedbackService";
import People from "../interfaces/People";
import { getPeopleInfoByPhone, updatePeopleInEvent } from "../services/eventServices";
import { useFormik } from "formik";
import Group from "../interfaces/Group";
import { getAllGroup } from "../services/GroupServices";
import { sendsmstoclient } from "../services/SMSservices";


interface UpdatePeopleToInvitationProps {
    eventId: string;
    phoneNum: string;
    refresh: Function;
    onHide: Function;
}

const UpdatePeopleToInvitation: FunctionComponent<UpdatePeopleToInvitationProps> = ({ eventId, refresh, onHide, phoneNum }) => {
    let [people, setpoepole] = useState<People>({ phoneNumber: "", firstName: "", lastName: "", NumberOfGuests: 0, NumberOfGuestsAccept: 0, eventGroupName: "" });
    let [allGroup, setAllGroup] = useState<Group[]>([]);
    useEffect(() => {
        getPeopleInfoByPhone(eventId, phoneNum)
            .then((res) => { setpoepole(res.data); console.log(res.data) })
            .catch((e) => console.log(e));
        getAllGroup(eventId).then((res) => setAllGroup(res.data)).catch((e) => console.log(e));
    }, []);



    let counter: number = 0;

    let formik = useFormik({
        initialValues: { phoneNumber: people?.phoneNumber, firstName: people?.firstName, lastName: people?.lastName, NumberOfGuests: people?.NumberOfGuests, NumberOfGuestsAccept: people?.NumberOfGuestsAccept, eventGroupName: people?.eventGroupName },
        enableReinitialize: true,
        validationSchema: yup.object({
            phoneNumber: yup.string().required().min(2),
            firstName: yup.string().required().min(2),
            lastName: yup.string().required().min(2),
            NumberOfGuests: yup.number().required().positive(),
            NumberOfGuestsAccept: yup.number().required().positive(),
            eventGroupName: yup.string().required()
        }),
        onSubmit: (values: People) => {
            updatePeopleInEvent(eventId, values).then((res) => {
                onHide();
                successMessage("People data change and save");
                refresh();
            })
                .catch((e) => console.log(e))
        }
    })
    return (<>
        <div>
            <h5 className="display-5"> Update Guost{`=> ${people.firstName} ${people.lastName}`}</h5>
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
                    <select defaultValue={'DEFAULT'}

                        className="form-control"
                        id="eventGroupName"
                        placeholder="textme"
                        name="eventGroupName"
                        value={formik.values.eventGroupName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}>

                        <option value="DEFAULT" hidden >Choose a Group...</option>
                        {allGroup.map((groupname: Group) => <option key={counter++} value={groupname.eventGroupName}> {groupname.eventGroupName}</option>)}

                    </select>
                    <label htmlFor="eventGroupName">Group</label>
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
                    <label htmlFor="NumberOfGuests">Number Of Guests</label>
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


                <button type="submit" className="btn btn-success w-100 my-3"
                // disabled={!formik.isValid || !formik.dirty}
                ><i className="fa-solid fa-floppy-disk"></i>  Save Change</button>
            </form>
        </div>

    </>);
}

export default UpdatePeopleToInvitation;