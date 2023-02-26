import { FunctionComponent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import People from "../interfaces/People";
import { getPeopleInEventByID } from "../services/eventServices";
import { sendsmstoclient } from "../services/SMSservices";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";
import "./invTable.css";
import { successMessage } from "../services/FeedbackService";

interface InvitationTableProps {
    peopleChanged: boolean;
    setPeopleChanged: Function;


    setPcountercome: Function;
    countercome: number;
}

const InvitationTable: FunctionComponent<InvitationTableProps> = ({ peopleChanged, setPeopleChanged,


    setPcountercome, countercome


}) => {
    let [peopleArr, setPeopleArr] = useState<People[]>([]);

    // Open Modal
    let [opendeleteModal, setOpendeleteModal] = useState<boolean>(false);
    let [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
    let [idPeople, setIdPepole] = useState<string>("");
    let [peopleItemPhoneNum, setItemPepole] = useState<string>("");

    let refresh = () => {
        setPeopleChanged(!peopleChanged);
    }
    let { eventId } = useParams();
    let counter: number = 0;
    let navigate = useNavigate();

    // רענון --הוספת הדיפנדנסיס בלבד
    useEffect(() => {
        getPeopleInEventByID(eventId as string).then((res) => {
            setPeopleArr(res.data);
        }).catch((e) => console.log(e))
    }, [peopleChanged]);


    let editphone = (phone: string) => {
        var p = phone;
        if (phone.startsWith("+972")) {
            p = phone.slice(4);
        } else
            if (phone.startsWith("05")) {
                p = phone.slice(1);
            }
        return p;
    }



    return (<>
        <h5 className="">{peopleArr.length}  Guest list for the event</h5>

        {peopleArr.length ? (<table className="table lightFont">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Fisrt Name</th>
                    <th>Last Name</th>
                    <th>Group</th>
                    <th>Phone Number</th>
                    <th><i className="fa-regular fa-circle-check" style={{ color: "blue" }}></i> Invited Guests</th>
                    <th><i className="fa-regular fa-circle-check" style={{ color: "green" }}></i> ACCEPT Guests</th>
                    <th>SMS TO Guest</th>
                    <th>Edit</th>
                    <th>Delete</th>

                </tr>
            </thead>
            <tbody>
                {peopleArr.map((people: People) => <tr key={counter}>
                    <td>{++counter}</td>
                    <td>{people.firstName}</td>
                    <td>{people.lastName}</td>
                    <td>{people.eventGroupName}</td>
                    <td>{people.phoneNumber}</td>
                    <td>{people.NumberOfGuests}</td>
                    <td><span style={{ color: "green" }}>{people.NumberOfGuestsAccept}
                        {/* {setPcountercome(countercome+people.NumberOfGuestsAccept)} */}
                        <i className="fa-solid fa-person"  ></i></span></td>
                    <td onClick={() => {
                        sendsmstoclient({
                            message: `שלום ${people.firstName}, הוזמנתם לחתונה של  
                        לפרטים ואישור הגעה  https://crmsms.netlify.app/event/${eventId}/${people.phoneNumber}
                        נשמח לראותכם`, phone: `+972${editphone(people.phoneNumber)}`
                        }).then(() => successMessage("SMS sent")).catch((e) => console.log(e))

                    }}><i className="fa-solid fa-comment-sms"></i></td>
                    <td onClick={() => {
                        setItemPepole(people.phoneNumber)
                        setOpenUpdateModal(true);
                    }}><i className="fa-solid fa-pen text-success"></i></td>
                    <td onClick={() => {
                        setItemPepole(people.phoneNumber);
                        setOpendeleteModal(true);
                    }}><i className="fa-solid fa-trash-can text-danger"></i></td>


                </tr>)}
            </tbody>
        </table>) : (<h3> No peoples</h3>)}
        <DeleteModal show={opendeleteModal} onHide={() => setOpendeleteModal(false)} phoneNum={peopleItemPhoneNum} eventId={eventId as string} refresh={refresh} />
        <UpdateModal show={openUpdateModal} onHide={() => setOpenUpdateModal(false)} eventId={eventId as string} phoneNum={peopleItemPhoneNum} refresh={refresh} />
    </>);
}

export default InvitationTable;