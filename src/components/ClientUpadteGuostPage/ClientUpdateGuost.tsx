import { FunctionComponent, useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button } from "react-bootstrap";
import People from "../../interfaces/People";
import { successMessage } from "../../ServicesOEM/FeedbackService";
import { updatePeopleInEvent } from "../../ServicesOEM/eventServices";
import { useParams } from "react-router-dom";

import './ClientPage.css';


interface ClientUpdateGuostProps {
    people: People;
}

const ClientUpdateGuost: FunctionComponent<ClientUpdateGuostProps> = ({ people }) => {
    let { eventId } = useParams();
    let [pepoleCount, setPepoleCount] = useState<number>(people.NumberOfGuestsAccept);
    // console.log(pepoleCount);

    let formik = useFormik({
        initialValues: { phoneNumber: people?.phoneNumber, firstName: people?.firstName, lastName: people?.lastName, NumberOfGuests: people?.NumberOfGuests, NumberOfGuestsAccept: pepoleCount, eventGroupName: people?.eventGroupName },
        enableReinitialize: true,
        validationSchema: yup.object({
            NumberOfGuestsAccept: yup.number().required().positive(),
        }),
        onSubmit: (values: People) => {

            updatePeopleInEvent(eventId as string, { ...values, NumberOfGuestsAccept: pepoleCount }).then((res) => {
                successMessage("See You Soon! All data save... and you SAVE THE DATE :)");
            }).catch((e) => console.log(e))
        }
    })

    return (<>

        <div>
            <label>Are you going to come with {people.NumberOfGuests} people? </label>
            <form onSubmit={formik.handleSubmit}>

                <div className="form-floating mb-3 qty mt-5 divPlusMin">

                    <span className="minus bg-dark" onClick={() => {
                        if (pepoleCount >= 0) { setPepoleCount(pepoleCount--) }

                    }}>-</span>
                    <input type="number" className="count " id="NumberOfGuestsAccept" name="NumberOfGuestsAccept"
                        disabled value={pepoleCount} style={{ border: "0", width: "4rem", textAlign: "right", backgroundColor: "white" }} />
                    <span className="plus bg-dark" onClick={() => {
                        setPepoleCount(pepoleCount++);
                        // console.log("+ click" + pepoleCount);
                    }}>+</span>
                    <div><i className="fa-solid fa-people-group"></i> Pepole</div>
                </div>
                <button type="submit" className="btn btn-success w-50"
                >  Update</button>
            </form>
        </div>

    </>);
}

export default ClientUpdateGuost;