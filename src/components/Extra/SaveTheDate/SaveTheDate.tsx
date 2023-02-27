import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventInfoByID } from "../../../services/eventServices";
import "./savedate.css";

interface SaveTheDateProps {

}

const SaveTheDate: FunctionComponent<SaveTheDateProps> = () => {
    let [coupleName, setCoupleName] = useState<string>("");
    let { eventId } = useParams();
    useEffect(() => {

        getEventInfoByID(eventId as string).then((res) => { setCoupleName(`${res.data.groom} & ${res.data.bride}`) });
    }, []);
    return (<>
        <div className="div">
            <div className="divsave">
                <p className="title">Save The Date</p>
                <p className="COUPLE">{coupleName}</p>

                <div className="date"> -20
                    <i className="point">&#x2764;</i>2<i className="point">&#x2764;</i>2023-
                </div>

            </div>
            {/* <div className="info">
                <h3>hi</h3>
            </div>  */}
            <img src="https://github.com/lidormalich/crmsms/blob/master/src/components/Extra/frm.png?raw=true" alt="" className="frame responsiveImg" />
            <img src="https://github.com/lidormalich/crmsms/blob/master/src/components/Extra/cuple.jpg?raw=true" alt="" className="cuple responsiveImg" />
        </div>
    </>);
}

export default SaveTheDate;