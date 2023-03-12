import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventInterface from "../../interfaces/EventInterface";
import { getEventInfoByID } from "../../Services/eventServices";
import Loading from "../Extra/Loading";
import WeddingInvitation from "./WeddingInvitation";

interface InvitationProps {

}

const Invitation: FunctionComponent<InvitationProps> = () => {
    let { eventId } = useParams();

    let [info, setInfo] = useState<EventInterface>({
        _id: "", uuid: "", campaignName: "", ownerName: "", phone: "", bride: "", groom: "", groomParents: "", brideParents: "", coupleImage: "", weddingSentence: ""
    });
    let [flage, setFlage] = useState<boolean>(false);
    useEffect(() => {
        getEventInfoByID(eventId as string).then((res) => {
            setInfo(res.data);
            res.data._id != null ? setFlage(true) : setFlage(false);
        }).catch((error) => { console.log(error) });
    }, []);

    return (<>
        {flage ? <WeddingInvitation eventInfo={info} /> : <Loading stringToShow={"No Data To Show"} />}
    </>);
}

export default Invitation;