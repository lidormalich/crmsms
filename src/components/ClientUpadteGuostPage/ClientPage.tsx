import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import People from "../../interfaces/People";
import { getEventInfoByID, getPeopleInfoByPhone } from "../../services/eventServices";
import Footer from "../Extra/Footer";
import ClientUpdateGuost from "./ClientUpdateGuost";

interface ClientPageProps {

}

const ClientPage: FunctionComponent<ClientPageProps> = () => {
    let { eventId, phoneNum } = useParams();
    let [people, setpoepole] = useState<People>({ phoneNumber: "", firstName: "", lastName: "", NumberOfGuests: 0, NumberOfGuestsAccept: 0, eventGroupName: "" });
    let [weddingInfo, setWeddingInfo] = useState<any>({ uuid: "", campaignName: "", ownerName: "", phone: "", bride: "", groom: "" });

    useEffect(() => {
        getPeopleInfoByPhone(eventId as string, phoneNum as string)
            .then((res) => {
                setpoepole(res.data); console.log(res.data);
            })
            .catch((e) => console.log(e));
        getEventInfoByID(eventId as string).then((res) => setWeddingInfo(res.data)).catch((e) => console.log(e))
    }, []);
    return (<>
        {/* {console.log(people.NumberOfGuestsAccept + "APPCETEDDDDD")} */}
        <div className="container">

            <h6 className="display-6">{`Hi ${people.firstName}, `}</h6>
            <h6 className="display-6">{`You are invited to the wedding event of ${weddingInfo.bride} and ${weddingInfo.groom}. Please confirm here the number of people you will come to the event.Thank you`}</h6>
            <div className=" mt-3 ">
                <p className="h6">{`Then you will receive a message confirming your arrival at the event, thank you very much`}</p>
                <ClientUpdateGuost people={people} />
            </div>
            <Footer />
        </div>
    </>);
}

export default ClientPage;