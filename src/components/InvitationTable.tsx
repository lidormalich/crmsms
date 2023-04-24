import { FunctionComponent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEventInfoByID, getPeopleInEventByID } from "../Services/eventServices";
import { sendsmstoclient } from "../Services/SMSservices";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";
import "./invTable.css";
import { errorMessage } from "../Services/FeedbackService";
import { BrowserView, isBrowser, isMobile } from "react-device-detect";
import { toast } from "react-toastify";
import People from "../interfaces/People";
import { Button } from "react-bootstrap";
import GloablModal from "./GloablModal";


interface InvitationTableProps {
    peopleChanged: boolean;
    setPeopleChanged: Function;
    refreshDash: Function;
}

const InvitationTable: FunctionComponent<InvitationTableProps> = ({ peopleChanged, setPeopleChanged, refreshDash }) => {
    let [peopleArr, setPeopleArr] = useState<People[]>([]);
    let [weddingInfo, setWeddingInfo] = useState<any>({ uuid: "", campaignName: "", ownerName: "", phone: "", bride: "", groom: "", coupleImage: "" });


    // Open Modal
    let [opendeleteModal, setOpendeleteModal] = useState<boolean>(false);
    let [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
    let [openGlobalModal, setOpenGlobalModal] = useState<boolean>(false);
    let [idPeople, setIdPepole] = useState<string>("");
    let [peopleItemPhoneNum, setItemPepole] = useState<string>("");

    let refresh = () => {
        setPeopleChanged(!peopleChanged);
        refreshDash();
    }
    let { eventId } = useParams();
    let counter: number = 0;



    useEffect(() => {
        getEventInfoByID(eventId as string).then((res) => setWeddingInfo(res.data)).catch((e) => { console.log(e); errorMessage("Error , Can't get info...") })
    }, []);


    useEffect(() => {
        getPeopleInEventByID(eventId as string).then((res) => {
            setPeopleArr(res.data);
        }).catch((e) => console.log(e));
    }, [peopleChanged]);


    let editphone = (phone: string) => {
        var newPhoneStr = phone;
        if (phone.startsWith("+972")) {
            newPhoneStr = phone.slice(4);
        } else
            if (phone.startsWith("05")) {
                newPhoneStr = phone.slice(1);
            }
        return newPhoneStr;
    }

    const getData = (people: People) => {
        const id = toast.loading("Please wait...", { position: toast.POSITION.TOP_CENTER });
        sendsmstoclient({
            message: `שלום ${people.firstName}, הוזמנתם לחתונה של  ${weddingInfo.groom} & ${weddingInfo.bride}
            הזמנה דיגיטלית לחתונה: https://crmsms.netlify.app/invitation/${eventId} 
            לפרטים ואישור הגעה >>  https://crmsms.netlify.app/event/${eventId}/${people.phoneNumber}

                        נשמח לראותכם בחתונתנו ${weddingInfo.groom} & ${weddingInfo.bride}`, phone: `+972${editphone(people.phoneNumber)}`, eventId: eventId as string
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
        <span>
            <Link className="btn btn-info mx-1 rounded-pill w-5" to={`/savethedate/${eventId}`}>Save The Date</Link>
            <Link className="btn btn-info mx-1 rounded-pill w-5" to={`/invitation/${eventId}`}>Online Invitation</Link>
            <Link className="btn btn-info mx-1 rounded-pill w-5" to={`/importExcel/${eventId}`}>Import from Excel</Link>
        </span>
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
                        { }
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
        </table>
        ) : (<h3> No peoples</h3>)}
        <div className="">
            <Button className="w-25 " onClick={() => setOpenGlobalModal(true)}>Add people</Button>
        </div>
        <DeleteModal show={opendeleteModal} onHide={() => setOpendeleteModal(false)} phoneNum={peopleItemPhoneNum} eventId={eventId as string} refresh={() => refresh()} />
        <GloablModal show={openGlobalModal} onHide={() => setOpenGlobalModal(false)} refresh={() => refresh()} setpeopleChanged={setPeopleChanged} peopleChange={peopleChanged} />
        <UpdateModal show={openUpdateModal} onHide={() => setOpenUpdateModal(false)} eventId={eventId as string} phoneNum={peopleItemPhoneNum} refresh={() => refresh()} />
    </>);
}

export default InvitationTable;