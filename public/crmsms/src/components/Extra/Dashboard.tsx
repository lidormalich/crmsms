import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCoupleImageInEvent, getEventDateByID } from "../../Services/eventServices";
import People from "../../interfaces/People";
import Countdown from "react-countdown";
import { globalContext } from "../../App";
import UIButton from "../ui/Button";
import Card from "../ui/Card";
import { useTranslation } from "../../i18n/useTranslation";

interface DashboardProps {
    peopleArr: People[];
    userRefresh: boolean;
}

// function monthDiff(d1: any, d2: any) {
//     var months;
//     months = (d2.year - d1.year) * 12;
//     months -= d1.month;
//     months += d2.month;
//     return months <= 0 ? 0 : months;
// }
const Dashboard: FunctionComponent<DashboardProps> = ({ peopleArr, userRefresh }) => {
    let globalContextVar = useContext<any>(globalContext);
    let [eventdate, seteventdate] = useState<string>("");
    let [coupleImage, setCoupleImage] = useState<string>("");
    let { eventId } = useParams();
    let navigate = useNavigate();
    const t = useTranslation();


    let counter = (peopleArr: People[]) => {
        let come = 0, appect = 0;
        for (const pepole of peopleArr) {
            come += pepole.NumberOfGuests;
            appect += pepole.NumberOfGuestsAccept;
        }
        return { come, appect };
    }
    const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
        if (!completed) {
            // Render a countdown
            if (days < 10) days = `0${days}`;
            if (hours < 10) hours = `0${hours}`;
            if (minutes < 10) minutes = `0${minutes}`;
            if (seconds < 10) seconds = `0${seconds}`;

            // return <span>{days} <span style={{ color: "rgb(136,108,228)", fontSize: "0.5em" }}>ימים</span>:{hours}<span style={{ color: "rgb(136,108,228)", fontSize: "0.5em" }}>שעות</span>:{minutes}<span style={{ color: "rgb(136,108,228)", fontSize: "0.5em" }}>דק</span></span>;
            return <span style={{ color: "rgb(136,108,228)" }}>{days}:{hours}:{minutes}</span>
        } else return <div style={{ color: "rgb(136,108,228)" }}>{t.dashboard.justMarried}</div>
    };
    useEffect(() => {
        counter(peopleArr);
    }, [userRefresh]);


    useEffect(() => {
        getCoupleImageInEvent(eventId as string).then((res) => setCoupleImage(res.data.coupleImage)).catch((e) => console.log(e));
        counter(peopleArr);
        getEventDateByID(eventId as string).then(res => { seteventdate(res.data[0].weddingDate) }).catch(e => console.log(e));
    }, [eventId]);
    
    const stats = counter(peopleArr);
    
    return (
        <div className="flex flex-wrap items-center justify-center gap-6 px-4 py-6">
            {/* Timer Card */}
            <Card
                className="min-w-[280px] max-w-[320px]"
                title={t.dashboard.timerForLove}
                icon={<i className="fa-solid fa-heart" />}
                iconColor="purple"
            >
                <div className="flex flex-col items-center justify-center py-4">
                    {eventdate !== "" ? (
                        <div className="text-center">
                            <div className="text-4xl font-bold text-purple-600">
                                <Countdown
                                    date={eventdate}
                                    intervalDelay={1000}
                                    zeroPadTime={2}
                                    zeroPadDays={2}
                                    precision={3}
                                    renderer={renderer}
                                    onComplete={() => <div>{t.dashboard.justMarried}</div>}
                                />
                            </div>
                            <div className="mt-2 text-sm text-purple-500">{t.dashboard.days}</div>
                        </div>
                    ) : (
                        <div className="text-slate-500">{t.dashboard.noDateSet}</div>
                    )}
                </div>
            </Card>

            {/* Couple Image Card */}
            <Card
                className="min-w-[280px] max-w-[320px]"
                title={t.dashboard.couplePhoto}
                icon={<i className="fa-solid fa-image" />}
                iconColor="blue"
            >
                <div className="flex flex-col items-center justify-center py-4">
                    {coupleImage !== "" ? (
                        <img
                            src={coupleImage}
                            alt="Couple"
                            className="h-36 w-full rounded-xl object-cover shadow-md"
                        />
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/3875/3875433.png"
                                alt="Placeholder"
                                className="h-24 w-24 opacity-50"
                            />
                            <UIButton
                                onClick={() => navigate(`/uploadimage/${eventId}`)}
                                leftIcon={<i className="fa-solid fa-upload" />}
                            >
                                {t.dashboard.addImage}
                            </UIButton>
                        </div>
                    )}
                </div>
            </Card>

            {/* Confirmed Arrival Card */}
            <Card
                className="min-w-[280px] max-w-[320px]"
                title={t.dashboard.confirmedArrival}
                icon={<i className="fa-regular fa-circle-check" />}
                iconColor="green"
            >
                <div className="flex flex-col items-center justify-center py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/30">
                            <i className="fa-regular fa-circle-check text-2xl text-white" />
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600">
                                {stats.appect}
                                <span className="text-lg text-slate-500">/{stats.come}</span>
                            </div>
                            <div className="text-xs text-slate-500">{t.dashboard.guestsConfirmed}</div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default Dashboard;