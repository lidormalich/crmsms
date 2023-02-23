import { FunctionComponent } from "react";
import "./Dashboard.css";

interface DashboardProps {
    letA: string;
    letb: string;
    letC: string;
}

const Dashboard: FunctionComponent<DashboardProps> = ({ letA, letb, letC }) => {
    return (<>
        <div className="d-flex justify-content-center align-items-center ">
            <div className="dashCards">
                <div className="dashCard">
                    <div className="title">Guest</div>
                    <div className="cardbody">
                        <div className="icon"> <i className="fa fa-bed"></i></div>
                        <div className="value">{letA}</div>
                    </div>
                </div>

                <div className="dashCard">
                    {/* צבע ירוק לאישור */}
                    <div className="title">כמה אישרו הגעה</div>
                    <div className="cardbody">
                        <div className="icon">
                            <i className="fa-regular fa-circle-check" style={{ color: "green" }}></i>
                        </div>
                        <div className="value">300 <span style={{ fontSize: ".5em" }}> מוזמנים</span></div>
                    </div>
                </div>

                <div className="dashCard">
                    <div className="title">כמה מגיעים</div>
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