import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventInfoByID } from "../../../ServicesOEM/eventServices";
import "./savedate.css";

interface SaveTheDateProps {
    coupleImage: string;
}

const SaveTheDate: FunctionComponent<SaveTheDateProps> = ({ coupleImage }) => {
    let [coupleName, setCoupleName] = useState<string>("");
    let [weddingInfo, setWeddingInfo] = useState<any>("");

    let { eventId } = useParams();
    useEffect(() => {
        getEventInfoByID(eventId as string).then((res) => setWeddingInfo(res.data.coupleImage)).catch((e) => console.log(e))

        getEventInfoByID(eventId as string).then((res) => { setCoupleName(`${res.data.groom} & ${res.data.bride}`) });
    }, []);

    return (<>
        <div className="div2main">
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

                {weddingInfo != "" ? (<img src={weddingInfo} alt="" className="cuple responsiveImg" />) : (<>
                    <img src={"https://res.cloudinary.com/ddk6cfhl0/image/upload/v1677517835/yjbm2infbdot6bixlvbg.jpg"} alt="" className="cuple responsiveImg" />

                </>)}


                <img src={""} alt="" className="cuple responsiveImg" />
            </div>
        </div>
    </>);
}

export default SaveTheDate;