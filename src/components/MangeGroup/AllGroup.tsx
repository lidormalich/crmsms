import { FunctionComponent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Group from "../../interfaces/Group";
import { getAllGroup } from "../../Services/GroupServices";
import Loading from "../Extra/Loading";

interface AllGroupProps {
    groupChanged: boolean;
}

const AllGroup: FunctionComponent<AllGroupProps> = ({ groupChanged }) => {
    let [allGroup, setAllGroup] = useState<Group[]>([]);
    let { eventId } = useParams();
    let counter: number = 0;


    useEffect(() => {
        getAllGroup(eventId as string).then((res) => setAllGroup(res.data)).catch((e) => console.log(e));

    }, [groupChanged]);
    return (<>

        <div className="container">
            <div className="mx-4">
                <ol>
                    {allGroup.length == 0 ? <Loading stringToShow={"NO GROUP"} /> : (allGroup.map((item) => <li key={counter++}>
                        {/* <Link to={`/editGroup/${eventId}`} className={"eventGroupName"}>{item.eventGroupName}</Link> */}
                        <h5 className={"eventGroupName"}>{item.eventGroupName}</h5>
                    </li>))}
                </ol>
            </div>
        </div>

    </>);
}

export default AllGroup;