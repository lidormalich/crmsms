import { FunctionComponent, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useParams } from "react-router-dom";
import EventInterface from "../../interfaces/EventInterface";
import People from "../../interfaces/People";
import { getEventInfoByID, getPeopleInfoByPhone } from "../../Services/eventServices";
import Footer from "../Extra/Footer";
import SaveTheDate from "../Extra/SaveTheDate/SaveTheDate";
import ClientUpdateGuost from "./ClientUpdateGuost";

interface ClientPageProps {}

const ClientPage: FunctionComponent<ClientPageProps> = () => {
    let { eventId, phoneNum } = useParams();
    let [people, setpoepole] = useState<People>({
        phoneNumber: "",
        firstName: "",
        lastName: "",
        NumberOfGuests: 0,
        NumberOfGuestsAccept: 0,
        eventGroupName: "",
    });
    let [weddingInfo, setWeddingInfo] = useState<any>({
        uuid: "",
        campaignName: "",
        ownerName: "",
        phone: "",
        bride: "",
        groom: "",
        coupleImage: "",
    });

    useEffect(() => {
        getPeopleInfoByPhone(eventId as string, phoneNum as string)
            .then((res) => setpoepole(res.data))
            .catch((e) => console.log(e));
        getEventInfoByID(eventId as string)
            .then((res) => setWeddingInfo(res.data))
            .catch((e) => console.log(e));
    }, [eventId, phoneNum]);

    if (!isMobile) {
        return (
            <div className="w-full max-w-md px-4">
                <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
                    <h1 className="mb-4 text-center text-2xl font-bold text-slate-900">
                        Mobile Only
                    </h1>
                    <p className="text-center text-slate-600">
                        This page is only available on mobile devices.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <SaveTheDate coupleImage={weddingInfo.coupleImage} />
            <div className="mx-auto max-w-md px-4 py-6">
                <div className="mb-6 text-center">
                    <h6 className="mb-2 text-xl font-bold text-slate-900">
                        Hi {people.firstName}!
                    </h6>
                    <p className="text-sm text-slate-600">
                        Please confirm how many people are coming to the event, thank you very much
                    </p>
                </div>
                <ClientUpdateGuost people={people} />
            </div>
            <div className="mt-6">
                <Footer />
            </div>
        </div>
    );
};

export default ClientPage;
