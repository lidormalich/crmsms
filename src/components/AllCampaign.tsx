import { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventInterface from "../interfaces/EventInterface";
import { getAllEvent } from "../services/eventServices";
import Dashboard from "./Extra/Dashboard";
import Loading from "./Extra/Loading";

interface AllCampaignProps {

}

const AllCampaign: FunctionComponent<AllCampaignProps> = () => {
    let [allEvent, setAllEvent] = useState<EventInterface[]>([]);
    let counter: number = 0;
    useEffect(() => {
        getAllEvent().then((res) => { setAllEvent(res.data); }).catch((e) => console.log(e));

    }, []);
    return (<>

        <div className="container">
            <h3 className="display-3">Details</h3>
            <Dashboard letA="alll" letb={allEvent.length + ""} letC="5555" />
            {allEvent.length ? (<table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Campaign ID</th>
                        <th>Info | Campaign Name</th>
                        <th>Link</th>

                    </tr>
                </thead>
                <tbody>
                    {allEvent.map((eventItem: EventInterface) => <tr key={counter}>
                        <td>{counter++}</td>
                        <td>{eventItem._id}</td>
                        <td>{eventItem.campaignName}</td>
                        <td><Link to={`/campaign/${eventItem._id}`}>Manage</Link></td>

                    </tr>)}
                </tbody>
            </table>) :
                <>
                    <Loading stringToShow={"no data to show- pls add"} /></>
            }
        </div>

    </>);
}

export default AllCampaign;