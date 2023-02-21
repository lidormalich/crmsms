import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isLoginGlobal } from "../App";
import EventInterface from "../interfaces/EventInterface";
import { getAllEvent } from "../services/eventServices";
import Loading from "./Extra/Loading";
import NotHaveAccess from "./Extra/NotHaveAccess";

interface AllCampaignProps {

}

const AllCampaign: FunctionComponent<AllCampaignProps> = () => {
    let [allEvent, setAllEvent] = useState<EventInterface[]>([]);
    let counter: number = 0;
    let isLogin = useContext<boolean>(isLoginGlobal);
    useEffect(() => {
        getAllEvent().then((res) => { setAllEvent(res.data); }).catch((e) => console.log(e));

    }, []);

    return (<>
        {!isLogin ? <NotHaveAccess /> : <>

            <div className="container">
                {/* <h3 className="display-3">Details</h3> */}
                {allEvent.length ? (<table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th><i className="fa-solid fa-id-card"></i>Campaign ID </th>
                            <th><i className="fa-solid fa-info"></i>Info | Campaign Name </th>
                            <th><i className="fa-solid fa-users-between-lines"></i>Manger Gruop </th>
                            <th><i className=" fa-solid fa-gear"></i>Manger  </th>

                        </tr>
                    </thead>
                    <tbody>
                        {allEvent.map((eventItem: EventInterface) => <tr key={counter}>
                            <td>{counter++}</td>
                            <td>{eventItem._id}</td>
                            <td>{eventItem.campaignName}</td>
                            <td><Link to={`/addgruop/${eventItem._id}`}>Manage</Link></td>
                            <td><Link to={`/campaign/${eventItem._id}`}>Manage Event</Link></td>

                        </tr>)}
                    </tbody>
                </table>) :
                    <>
                        <Loading stringToShow={"no data to show- pls add"} /></>
                }
            </div>
        </>}
    </>);
}

export default AllCampaign;