import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Book from "../interfaces/Book";
import People from "../interfaces/People";
import { getBook } from "../services/bookServices";
import { getPeopleInEventByID } from "../services/eventServices";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";

interface InvitationTableProps {
    peopleChanged: boolean;
    setPeopleChanged: Function;

}

const InvitationTable: FunctionComponent<InvitationTableProps> = ({ peopleChanged, setPeopleChanged }) => {
    let [peopleArr, setPeopleArr] = useState<People[]>([]);

    // Open Modal
    let [opendeleteModal, setOpendeleteModal] = useState<boolean>(false);
    let [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
    let [idPeople, setIdPepole] = useState<string>("");

    let refresh = () => {
        setPeopleChanged(!peopleChanged);
    }
    let { eventId } = useParams();
    let counter: number = 0;

    // רענון --הוספת הדיפנדנסיס בלבד
    useEffect(() => {
        getPeopleInEventByID(eventId as string).then((res) => {
            setPeopleArr(res.data);
            // console.log(res.data);
            // console.log("arr");

            // console.log(peopleArr);

        }).catch((e) => console.log(e))
    }, [peopleChanged]);





    return (<>
        <h5 className="">Guest list for the event</h5>

        {peopleArr.length ? (<table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>#</th>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Genre</th>
                    <th>Price</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {peopleArr.map((people: People) => <tr key={counter}>
                    <td>{counter++}</td>
                    <td>{people.NumberOfGuests}</td>
                    <td>{people.NumberOfGuestsAccept}</td>
                    <td>{people.firstName}</td>
                    <td>{people.lastName}</td>
                    <td>{people.phoneNumber}</td>
                    <td onClick={() => {
                        setIdPepole(people.phoneNumber as string)
                        setOpenUpdateModal(true);
                    }}><i className="fa-solid fa-pen text-success"></i></td>
                    <td onClick={() => {
                        setIdPepole(people.phoneNumber as string);
                        setOpendeleteModal(true);
                    }}><i className="fa-solid fa-trash-can text-danger"></i></td>
                </tr>)}
            </tbody>
        </table>) : (<h3> No peoples</h3>)}
        <DeleteModal show={opendeleteModal} onHide={() => setOpendeleteModal(false)} id={idPeople} refresh={refresh} />
        <UpdateModal show={openUpdateModal} onHide={() => setOpenUpdateModal(false)} id={idPeople} refresh={refresh} />
    </>);
}

export default InvitationTable;