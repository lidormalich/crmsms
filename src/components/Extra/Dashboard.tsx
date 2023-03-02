import { FunctionComponent, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCoupleImageInEvent } from "../../Services/eventServices";
import "./Dashboard.css";

interface DashboardProps {
    letA: string;
    letb: string;
    letC: string;
}

const Dashboard: FunctionComponent<DashboardProps> = ({ letA, letb, letC }) => {
    let [coupleImage, setCoupleImage] = useState<string>("");
    let { eventId } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        getCoupleImageInEvent(eventId as string).then((res) => setCoupleImage(res.data.coupleImage)).catch((e) => console.log(e));
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
                        <div className="value">300 <span style={{ fontSize: ".5em" }}> Invited</span></div>
                    </div>
                </div>

                <div className="dashCard">
                    <div className="cardtitle">Guests Arriving</div>
                    <div className="cardbody">
                        <div className="icon"><i className="fa-regular fa-circle-check" ></i></div>
                        <div className="value">600<span style={{ fontSize: ".5em" }}>/700</span></div>
                    </div>
                </div>
            </div>


        </div>




    </>);
}

export default Dashboard;