import { FunctionComponent } from "react";
import "./savedate.css";

interface SaveTheDateProps {

}

const SaveTheDate: FunctionComponent<SaveTheDateProps> = () => {
    return (<>
        <div className="div">
            <div className="divsave">
                <p className="title">Save The Date</p>
                <p className="COUPLE">לידור וטליה</p>

                <div className="date"> -20
                    <i className="point">&#x2764;</i>2<i className="point">&#x2764;</i>2023-
                </div>

            </div>
            {/* <div className="info">
                <h3>hi</h3>
            </div>  */}
            <img src="frm.png" alt="" className="frame responsiveImg" />
            <img src="cuple.jpg" alt="" className="cuple responsiveImg" />
        </div>
    </>);
}

export default SaveTheDate;