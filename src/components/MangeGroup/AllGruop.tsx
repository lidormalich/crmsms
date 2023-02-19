import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Group from "../../interfaces/Group";
import { getAllGroup } from "../../services/GruopServices";

interface AllGruopProps {

}

const AllGruop: FunctionComponent<AllGruopProps> = () => {
    let [allGroup, setAllGruop] = useState<Group[]>([]);
    let { eventId } = useParams();
    let counter: number = 0;


    useEffect(() => {
        getAllGroup(eventId as string).then((res) => setAllGruop(res.data)).catch((e) => console.log(e));

    }, []);
    return (<>

        <div className="container">
            <h5 className="display-5">All Gruop at that event</h5>
            <ol>
                {allGroup.map((item) => <li key={counter++}><a href="#">{item.eventGroupName}</a></li>)}
            </ol>

        </div>

    </>);
}

export default AllGruop;