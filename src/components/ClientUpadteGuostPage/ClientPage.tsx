import { FunctionComponent, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useParams } from "react-router-dom";
import EventInterface from "../../interfaces/EventInterface";
import People from "../../interfaces/People";
import { getEventInfoByID, getPeopleInfoByPhone } from "../../Services/eventServices";
import Footer from "../Extra/Footer";
import SaveTheDate from "../Extra/SaveTheDate/SaveTheDate";
import ClientUpdateGuost from "./ClientUpdateGuost";

interface ClientPageProps {

}

const ClientPage: FunctionComponent<ClientPageProps> = () => {
    let { eventId, phoneNum } = useParams();
    let [people, setpoepole] = useState<People>({ phoneNumber: "", firstName: "", lastName: "", NumberOfGuests: 0, NumberOfGuestsAccept: 0, eventGroupName: "" });
    let [weddingInfo, setWeddingInfo] = useState<any>({ uuid: "", campaignName: "", ownerName: "", phone: "", bride: "", groom: "", coupleImage: "" });

    useEffect(() => {
        getPeopleInfoByPhone(eventId as string, phoneNum as string)
            .then((res) => setpoepole(res.data))
            .catch((e) => console.log(e));
        getEventInfoByID(eventId as string).then((res) => setWeddingInfo(res.data)).catch((e) => console.log(e))
    }, []);
    return (<>
        <div className="container">
            {isMobile ? <> <SaveTheDate coupleImage={weddingInfo.coupleImage} />
                <div className="">
                    <h6 className="display-6">{`Hi ${people.firstName}, `}</h6>
                    <p className="h6">{`Please confirm how many people are coming to the event, thank you very much`}</p>
                    <ClientUpdateGuost people={people} />
                </div>
                <div className="mt-6"><Footer /></div></> : <><h1 className="display-1">This is only for mobile</h1></>}

        </div>
    </>);
}

export default ClientPage;