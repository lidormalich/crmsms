import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventInterface from "../../../interfaces/EventInterface";
import { getEventInfoByID } from "../../../Services/eventServices";
import { useTranslation } from "../../../i18n/useTranslation";

interface SaveTheDateProps {
    coupleImage: string;
}

const SaveTheDate: FunctionComponent<SaveTheDateProps> = ({ coupleImage }) => {
    let [weddingInfo, setWeddingInfo] = useState<EventInterface>({
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
    const t = useTranslation();
    let { eventId } = useParams();

    useEffect(() => {
        getEventInfoByID(eventId as string)
            .then((res) => setWeddingInfo(res.data))
            .catch((e) => console.log(e));
    }, [eventId]);

    return (
        <div className="w-full max-w-md p-4">
            <div className="relative w-full max-w-md">
                <div className="relative mx-auto w-full max-w-[400px]">
                    {/* Save The Date Text */}
                    <div className="absolute left-0 top-16 z-10 flex flex-col">
                        <p className="font-Mellisia text-3xl text-[#CC2936] sm:text-4xl">
                            {t.invitation.saveTheDate}
                        </p>
                        <p className="mt-2 font-SBL text-xl font-light text-black sm:text-2xl">
                            <span>💜 {`${weddingInfo.groom} & ${weddingInfo.bride}`} 💜</span>
                        </p>
                        <p className="mt-2 font-Fredoka text-xl font-light text-[#ca4ccd] sm:text-2xl">
                            {weddingInfo.eventsHall}
                        </p>
                    </div>

                    {/* Frame Image */}
                    <img
                        src="https://i.imgur.com/UThPVNM.png"
                        alt="Frame"
                        className="relative z-0 w-full"
                    />

                    {/* Couple Image */}
                    {weddingInfo?.coupleImage !== "" ? (
                        <img
                            src={weddingInfo?.coupleImage}
                            alt="Couple"
                            className="absolute left-0 top-0 z-0 h-[400px] w-full object-cover"
                        />
                    ) : (
                        <img
                            src="https://res.cloudinary.com/ddk6cfhl0/image/upload/v1677517835/yjbm2infbdot6bixlvbg.jpg"
                            alt="Default"
                            className="absolute left-0 top-0 z-0 h-[400px] w-full object-cover"
                        />
                    )}

                    {/* Date */}
                    {weddingInfo.weddingDate && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 font-Lordranga text-2xl text-[#CC2936] sm:text-3xl">
                            -{weddingInfo.weddingDate}-
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SaveTheDate;
