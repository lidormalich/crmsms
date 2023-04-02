import { FunctionComponent, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getCoupleImageInEvent } from "../../Services/eventServices";
import "./Dashboard.css";
import People from "../../interfaces/People";

interface DashboardProps {
    peopleArr: People[];
    userRefresh: boolean;
}

const Dashboard: FunctionComponent<DashboardProps> = ({ peopleArr, userRefresh }) => {
    let [coupleImage, setCoupleImage] = useState<string>("");
    // let [come, setCome] = useState<number>(0);
    // let [appect, setAppect] = useState<number>(0);
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

    useEffect(() => {
        counter(peopleArr);
    }, [userRefresh]);


    useEffect(() => {
        getCoupleImageInEvent(eventId as string).then((res) => setCoupleImage(res.data.coupleImage)).catch((e) => console.log(e));
        counter(peopleArr);
    }, []);
    return (<>
        <div className="d-flex justify-content-center align-items-center ">
            <div className="dashCards"><div className="dashCard">
                {coupleImage != "" ? (<img src={coupleImage} alt="" className="imageSmall" />) : (<>
                    <img src={"https://cdn-icons-png.flaticon.com/512/3875/3875433.png"} alt="" className="imageSmallWithBTN" />
                    <Button onClick={() => navigate(`/uploadimage/${eventId}`)}>Add Image</Button>

                </>)}</div>

                <div className="dashCard">
                    {/* צבע ירוק לאישור */}
                    <div className="cardtitle">Confirmed Arrival</div>
                    <div className="cardbody">
                        <div className="icon">
                            <i className="fa-regular fa-circle-check" style={{ color: "green" }}></i>
                        </div>
                        <div className="value">{counter(peopleArr).appect} <span style={{ fontSize: ".5em" }}> Invited</span></div>
                    </div>
                </div>

                <div className="dashCard">
                    <div className="cardtitle">Guests Arriving</div>
                    <div className="cardbody">
                        <div className="icon"><i className="fa-regular fa-circle-check" ></i></div>
                        <div className="value">{counter(peopleArr).appect}<span style={{ fontSize: ".5em" }}>/{counter(peopleArr).come}</span></div>
                    </div>
                </div>
            </div>


        </div>




    </>);
}

export default Dashboard;