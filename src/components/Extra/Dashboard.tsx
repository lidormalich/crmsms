import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getCoupleImageInEvent, getEventDateByID } from "../../Services/eventServices";
import "./Dashboard.css";
import People from "../../interfaces/People";
import Countdown from "react-countdown";
import { globalContext } from "../../App";

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
        }
    };
    useEffect(() => {
        counter(peopleArr);
    }, [userRefresh]);


    useEffect(() => {
        getCoupleImageInEvent(eventId as string).then((res) => setCoupleImage(res.data.coupleImage)).catch((e) => console.log(e));
        counter(peopleArr);
        getEventDateByID(eventId as string).then(res => { seteventdate(res.data[0].weddingDate) }).catch(e => console.log(e));
    }, []);
    return (<>
        {console.log(eventdate.slice(eventdate.indexOf("-")))}
        <div className="d-flex justify-content-center align-items-center ">
            <div className="dashCards">



                <div className="dashCard">
                    {/* צבע ירוק לאישור */}
                    <div className="cardtitle" style={{ color: "rgb(136,108,228)", fontWeight: "bold" }}>Timer for Love</div>
                    <div className="cardbody">
                        <div dir="rtl" className="value" style={{ fontWeight: "bold", fontSize: "3vw" }}>
                            {eventdate != "" ? <Countdown date={eventdate}
                                intervalDelay={1000}
                                zeroPadTime={2}
                                zeroPadDays={2}
                                precision={3}
                                renderer={renderer}
                                onComplete={() => <div>Just Mirred</div>}
                            /> : <></>}
                            <div style={{ fontSize: ".5em" }}>💜 Days 💜</div>
                        </div>
                    </div>
                </div>
                <div className="dashCard">
                    {coupleImage != "" ? (<img src={coupleImage} alt="" className="imageSmall" />) : (<>
                        <img src={"https://cdn-icons-png.flaticon.com/512/3875/3875433.png"} alt="" className="imageSmallWithBTN" />
                        <Button onClick={() => navigate(`/uploadimage/${eventId}`)}>Add Image</Button>

                    </>)}</div>
                <div className="dashCard">
                    <div className="cardtitle">Confirmed Arrival</div>
                    <div className="cardbody">
                        <div className="icon"><i className="fa-regular fa-circle-check" style={{ color: "green" }} ></i></div>
                        <div className="value">{counter(peopleArr).appect}<span style={{ fontSize: ".5em" }}>/{counter(peopleArr).come}</span>
                        </div>
                    </div>
                </div>
            </div>


        </div>




    </>);
}

export default Dashboard;