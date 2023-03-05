import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isLoginGlobal } from "../App";
import EventInterface from "../interfaces/EventInterface";
import { deleteEvent, getAllEvent } from "../ServicesOEM/eventServices";
import Loading from "./Extra/Loading";
import NotHaveAccess from "./Extra/NotHaveAccess";
import { isBrowser } from 'react-device-detect';
import DeleteCMP from "./DeleteCMP";


interface AllCampaignProps {

}

const AllCampaign: FunctionComponent<AllCampaignProps> = () => {
    let [allEvent, setAllEvent] = useState<EventInterface[]>([]);
    let [opendeleteModal, setOpendeleteModal] = useState<boolean>(false);
    let [userRefresh, setuserRefresh] = useState<boolean>(false);
    let [eventID, setEventID] = useState<string>("");

    let counter: number = 0;
    let isLogin = useContext<boolean>(isLoginGlobal);
    useEffect(() => {
        getAllEvent(sessionStorage.getItem("Authorization") as string).then((res) => { setAllEvent(res.data); }).catch((e) => console.log(e));

    }, [userRefresh]);

    let refresh = () => {
        setuserRefresh(!userRefresh);
    }
    return (<>
        {!isLogin ? <NotHaveAccess /> : <>

            <div className="container">
                {/* <h3 className="display-3">Details</h3> */}
                {allEvent.length ? (<table className="table table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Info | Campaign Name</th>
                            <th>Group Manage</th>
                            <th>Manage</th>
                            <th>Delete Event</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allEvent.map((eventItem: EventInterface) => <tr key={counter}>
                            <td>{counter++}</td>
                            {/* {isBrowser && (<td>{eventItem._id}</td>)} */}
                            <td>{eventItem.campaignName}</td>
                            <td><Link to={`/group/${eventItem._id}`}><img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/user-management-3497686-2927497.png" height={30} alt="" /></Link></td>
                            <td><Link to={`/campaign/${eventItem._id}`}><img src="https://cdn-icons-png.flaticon.com/512/32/32355.png" height={30} alt="" /></Link></td>
                            <td onClick={() => {
                                setEventID(eventItem._id as string)
                                setOpendeleteModal(true);
                            }}>
                                <img src="https://img.icons8.com/ios/256/del-key.png" height={30} alt="" />
                            </td>

                        </tr>)}
                    </tbody>
                </table>) :
                    <>
                        <Loading stringToShow={"no data to show- pls add"} /></>
                }
            </div>
            <DeleteCMP show={opendeleteModal} onHide={() => setOpendeleteModal(false)} eventId={eventID as string} refresh={refresh} />
        </>}
    </>);
}

export default AllCampaign;