import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventInterface from "../../../interfaces/EventInterface";
import { getEventInfoByID } from "../../../Services/eventServices";
import "./savedate.css";

interface SaveTheDateProps {
    coupleImage: string;
}

const SaveTheDate: FunctionComponent<SaveTheDateProps> = ({ coupleImage }) => {
    let [coupleName, setCoupleName] = useState<string>("");
    let [weddingInfo, setWeddingInfo] = useState<EventInterface>({ campaignName: "", ownerName: "", phone: "", uuid: "", bride: "", groom: "", groomParents: "", brideParents: "", coupleImage: "", weddingSentence: "", weddingDate: "" });

    let { eventId } = useParams();
    useEffect(() => {
        // בדיקת איבנט שגוי והחזרה למסך הראשי

        getEventInfoByID(eventId as string).then((res) => setWeddingInfo(res.data)).catch((e) => console.log(e))

        // getEventInfoByID(eventId as string).then((res) => { setCoupleName() });
    }, []);

    return (<>
        <div className="div2main">
            <div className="div">
                <div className="divsave">
                    <p className="title">Save The Date</p>
                    <p className="COUPLE">{`${weddingInfo.groom} & ${weddingInfo.bride}`}</p>

                    {/* <div className="date"> -20
                    <i className="point">&#x2764;</i>2<i className="point">&#x2764;</i>2023-
                </div> */}


                </div>

                <img src="https://github.com/lidormalich/crmsms/blob/master/src/components/Extra/frm.png?raw=true" alt="" className="frame responsiveImg" />

                {weddingInfo?.coupleImage != "" ? (<img src={weddingInfo?.coupleImage} alt="" className="cuple responsiveImg" />) : (<>
                    <img src={"https://res.cloudinary.com/ddk6cfhl0/image/upload/v1677517835/yjbm2infbdot6bixlvbg.jpg"} alt="" className="cuple responsiveImg" />

                </>)}
                <span className=" date">
                    -{weddingInfo.weddingDate}-</span>

            </div>


        </div >
        {/* <div className="main" style={{ position: "relative", width: "100 %", maxWidth: "400px", height: "600px" }}>

            <p className="textName" id="cuople" >יוחאי & ירדן</p>
            <p className="textName" id="save">SAVE THE DATE</p>
            <span className="textName" id="date">
                <div style={{ position: "relative" }}><span>27</span><span style={{ position: "absolute", bottom: "-15px" }}>*</span><span
                    style={{ position: "absolute", transform: " translateX(20px)" }}>08</span><span
                        style={{ position: "absolute", bottom: "-15px", transform: "translateX(60px)" }}>*</span><span
                            style={{ position: "absolute", transform: "translateX(80px)" }}>2022</span>
                </div>
            </span>

            <img src="frm.png" alt="" className="imageRes" style={{
                zIndex: "1", position: "absolute",
                width: " 100 %"
            }} />
            <img src="https://res.cloudinary.com/ddk6cfhl0/image/upload/v1677517835/yjbm2infbdot6bixlvbg.jpg" alt=""
                className="imageRes" style={{
                    position: "absolute", width: " 100 %"
                }} />
        </div> */}
    </>);
}

export default SaveTheDate;