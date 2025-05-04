import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventInterface from "../../../interfaces/EventInterface";
import { getEventInfoByID } from "../../../Services/eventServices";
import "./savedate.css";

interface SaveTheDateProps {
    coupleImage: string;
}

const SaveTheDate: FunctionComponent<SaveTheDateProps> = ({ coupleImage }) => {
    const [weddingInfo, setWeddingInfo] = useState<EventInterface>({
        campaignName: "",
        ownerName: "",
        phone: "",
        uuid: "",
        bride: "",
        groom: "",
        groomParents: "",
        brideParents: "",
        coupleImage: "",
        weddingSentence: "",
        weddingDate: "",
        eventsHall: "",
    });

    const { eventId } = useParams();

    useEffect(() => {
        if (!eventId) return;

        getEventInfoByID(eventId)
            .then((res) => setWeddingInfo(res.data))
            .catch((e) => console.error("Error fetching event info:", e));
    }, [eventId]);

    return (
        <div className="div2main">
            <div className="div">
                <div className="divsave">
                    <p className="title">Save The Date</p>
                    <p className="COUPLE">
                        <span>
                            &#128141; {`${weddingInfo.groom || "Groom"} & ${weddingInfo.bride || "Bride"}`} &#128141;
                        </span>
                    </p>
                    <p className="event">{weddingInfo.eventsHall || "Event Hall"}</p>
                </div>

                <img
                    src="https://i.imgur.com/UThPVNM.png"
                    alt="Frame"
                    className="frame responsiveImg"
                />

                {weddingInfo.coupleImage ? (
                    <img
                        src={weddingInfo.coupleImage}
                        alt="Couple"
                        className="responsiveImg secImg"
                    />
                ) : (
                    <img
                        src="https://res.cloudinary.com/ddk6cfhl0/image/upload/v1677517835/yjbm2infbdot6bixlvbg.jpg"
                        alt="Default Couple"
                        className="secImg responsiveImg"
                    />
                )}

                <span className="date">-{weddingInfo.weddingDate || "Date"}-</span>
            </div>
        </div>
    );
};

export default SaveTheDate;