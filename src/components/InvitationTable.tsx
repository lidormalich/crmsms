import { FunctionComponent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getEventInfoByID, getPeopleInEventByID } from "../Services/eventServices";
import { sendsmstoclient } from "../Services/SMSservices";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";
import "./invTable.css";
import { earningMessage, errorMessage, successMessage } from "../Services/FeedbackService";
import { BrowserView, isBrowser, isMobile } from "react-device-detect";
import { toast } from "react-toastify";
import People from "../interfaces/People";


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
    let [weddingInfo, setWeddingInfo] = useState<any>({ uuid: "", campaignName: "", ownerName: "", phone: "", bride: "", groom: "", coupleImage: "" });


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


    useEffect(() => {
        getEventInfoByID(eventId as string).then((res) => setWeddingInfo(res.data)).catch((e) => { console.log(e); errorMessage("Error , Can't get info...") })

    }, []);


    // רענון --הוספת הדיפנדנסיס בלבד
    useEffect(() => {
        getPeopleInEventByID(eventId as string).then((res) => {
            setPeopleArr(res.data);
        }).catch((e) => console.log(e));
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

    const getData = (people: People) => {
        const id = toast.loading("Please wait...", { position: toast.POSITION.TOP_CENTER });
        sendsmstoclient({
            message: `שלום ${people.firstName}, הוזמנתם לחתונה של  ${weddingInfo.groom} & ${weddingInfo.bride}
            הזמנה דיגיטלית לחתונה: https://crmsms.netlify.app/invitation/${eventId} 
            לפרטים ואישור הגעה >>  https://crmsms.netlify.app/event/${eventId}/${people.phoneNumber}

                        נשמח לראותכם בחתונתנו ${weddingInfo.groom} & ${weddingInfo.bride}`, phone: `+972${editphone(people.phoneNumber)}`
        }, sessionStorage.getItem("Authorization") as string)
            .then(() => {
                toast.update(id, {
                    render: "SMS sent", type: "success", isLoading: false,
                    autoClose: 5000,
                });

            }).catch(err => {
                toast.update(id, { render: "Something went wrong", type: "error", isLoading: false, autoClose: 5000, });
                console.log(err);
            });
    }

    return (<>
        <h5 className="">{peopleArr.length}  Guest list for the event</h5>

        {peopleArr.length ? (<table className="table lightFont">
            <thead>
                <tr>
                    <BrowserView><th>#</th></BrowserView>
                    <th>Name</th>
                    <th>Group</th>
                    <th>Phone</th>
                    <th> Guests</th>
                    <th>SMS</th>
                    <th>Edit / Delete</th>

                </tr>
            </thead>
            <tbody>
                {peopleArr.map((people: People) => <tr key={counter}>
                    {isBrowser && <td>{++counter}</td>}
                    <td>{`${people.firstName} ${people.lastName}`}</td>
                    <td>{people.eventGroupName}</td>
                    <td>{isMobile ? `${(people.phoneNumber).slice(0, 5)} ${(people.phoneNumber).slice(5)}` : people.phoneNumber}</td>
                    <td>{people.NumberOfGuestsAccept > 0 ? <span style={{ color: "green" }}>{people.NumberOfGuestsAccept}
                        /{people.NumberOfGuests}</span> : <span style={{ color: "black" }}>{people.NumberOfGuestsAccept}
                        /{people.NumberOfGuests}</span>}
                    </td>
                    <td onClick={() => { getData(people) }}><i className="fa-solid fa-comment-sms"></i></td>
                    <td>
                        <i className="fa-solid fa-pen text-success mx-2" onClick={() => {
                            setItemPepole(people.phoneNumber)
                            setOpenUpdateModal(true);
                        }}></i>
                        <i className="fa-solid fa-trash-can text-danger" onClick={() => {
                            setItemPepole(people.phoneNumber);
                            setOpendeleteModal(true);
                        }}></i>
                    </td>


                </tr>)}
            </tbody>
        </table>) : (<h3> No peoples</h3>)}
        <DeleteModal show={opendeleteModal} onHide={() => setOpendeleteModal(false)} phoneNum={peopleItemPhoneNum} eventId={eventId as string} refresh={() => refresh()} />
        <UpdateModal show={openUpdateModal} onHide={() => setOpenUpdateModal(false)} eventId={eventId as string} phoneNum={peopleItemPhoneNum} refresh={() => refresh()} />
    </>);
}

export default InvitationTable;