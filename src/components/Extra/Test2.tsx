import { FunctionComponent } from "react";
import "./test2.css";

interface TestProps {

}

const Test: FunctionComponent<TestProps> = () => {
    return (<>

        <div className="main">

            <p className="textName" id="cuople">יוחאי & ירדן</p>
            <p className="textName" id="save">SAVE THE DATE</p>
            <span className="textName" id="date">
                <div style={{ position: "relative" }}><span>27</span><span style={{ position: "absolute", bottom: "-15px" }}>*</span><span
                    style={{ position: "absolute", transform: "translateX(20px)" }}>08</span><span
                        style={{ position: "absolute", bottom: "-15px", transform: " translateX(60px)" }}>*</span><span
                            style={{ position: "absolute", transform: "translateX(80px)" }}>2022</span>
                </div>
            </span>

            <img src="frm.png" alt="" className="imageRes" style={{ zIndex: "1" }} />
            <img src="https://res.cloudinary.com/ddk6cfhl0/image/upload/v1677517835/yjbm2infbdot6bixlvbg.jpg" alt=""
                className="imageRes" />
        </div>
    </>);
}

export default Test;