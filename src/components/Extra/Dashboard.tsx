import { FunctionComponent } from "react";
import "./Dashboard.css";

interface DashboardProps {
    letA: string;
    letb: string;
    letC: string;
}

const Dashboard: FunctionComponent<DashboardProps> = ({ letA, letb, letC }) => {
    return (<>
        <div className="d-flex justify-content-center ">
            <div className="dashCards">
                <div className="dashCard">
                    <div className="title">Guest</div>
                    <div className="cardbody">
                        <div className="icon"> <i className="fa fa-bed"></i></div>
                        <div className="value">{letA}</div>
                    </div>
                </div>

                <div className="dashCard">
                    <div className="title">NUM OF EVENT</div>
                    <div className="cardbody">
                        <div className="icon">
                            <i className="fa-regular fa-circle-check" ></i>
                        </div>
                        <div className="value">{letb}<span style={{ fontSize: ".5em" }}> Events</span></div>
                    </div>
                </div>

                <div className="dashCard">
                    <div className="title">ACCEPT Guests</div>
                    <div className="cardbody">
                        <div className="icon"><i className="fa-regular fa-circle-check" ></i></div>
                        <div className="value">{letA}<span style={{ fontSize: ".5em" }}>/{letC}</span></div>
                    </div>
                </div>
            </div>
        </div>

    </>);
}

export default Dashboard;