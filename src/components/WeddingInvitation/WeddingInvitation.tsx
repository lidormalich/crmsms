import { info } from "console";
import { FunctionComponent } from "react";
import EventInterface from "../../interfaces/EventInterface";
import "./WeddingInvitation.css";

interface WeddingInvitationProps {
    eventInfo: EventInterface;
}

const WeddingInvitation: FunctionComponent<WeddingInvitationProps> = ({ eventInfo }) => {


    return (<>
        <div className="body">
            <div className="invitation-container">
                <div className="invitation">
                    <svg viewBox="0 0 500 500" className="title-curved-text">
                        <path fill="transparent" id="curve"
                            d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97" />
                        <text fill="black">
                            <textPath xlinkHref="#curve" startOffset="50%" textAnchor="middle" style={{ fontFamily: "yiddishkeit" }}>
                                "עוד ישמע בערי יהודה ובחוצות ירושלים קול ששון וקול שמחה קול חתן וקול כלה"
                            </textPath>
                        </text>
                    </svg>
                    <small className="basad">בס"ד</small>
                    <div className="invite-body">
                        <h1 className="invite-title">
                            {eventInfo.bride}
                            <img src="https://e.unicode-table.com/orig/c8/8d8213fdfc319115454d1a34b7b36e.png" alt=""
                                height="35" />
                            {eventInfo.groom}
                        </h1>
                        <div className="subtitle">
                            <img src="https://em-content.zobj.net/source/noto-emoji-animations/344/revolving-hearts_1f49e.gif"
                                alt="" height="20" />
                            מזמינים אתכם לחתונתם
                            <img src="https://em-content.zobj.net/source/noto-emoji-animations/344/revolving-hearts_1f49e.gif"
                                alt="" height="20" />
                        </div>
                        <div className="times">
                            <div className="time">
                                <div className="opposite">קבלת <br />פנים<br /><img src="https://cdn-icons-png.flaticon.com/512/9194/9194869.png" alt="" height="20" style={{ transform: "rotate(90deg)", marginLeft: "5px" }} /></div>
                                <div className="time-hour">19:00</div>
                                <div className="details">יום שישי, יוני 2021 שעה: 19:00 - 23:00<br />אולם החתונות SIMAY<br />כתובת
                                    אולם</div>
                            </div>
                            <div className="time">
                                <div className="opposite">חופה <br /> וקידושין<br /><img src="https://cdn-icons-png.flaticon.com/512/4154/4154967.png" alt="" height="20" /></div>
                                <div className="time-hour">20:00</div>
                                <div className="details">יום שישי, יוני 2021 שעה: 19:00 - 23:00<br />אולם החתונות SIMAY<br />כתובת
                                    אולם</div>
                            </div>
                            <div className="time">
                                <div className="opposite">עושים<br /> שמח <br /><img src="https://cdn-icons-png.flaticon.com/512/562/562678.png" alt="" height="20" /></div>
                                <div className="time-hour" dir="rtl">20:00 עד הסוף</div>
                                <div className="details">יום שישי, יוני 2021 שעה: 19:00 - 23:00<br />אולם החתונות SIMAY<br />כתובת
                                    אולם</div>
                            </div>
                        </div>
                        <div className="subtitle">
                            <span>
                                <img src="https://e.unicode-table.com/orig/c8/8d8213fdfc319115454d1a34b7b36e.png" alt="" height="20" />
                                נשמח לראותכם בין אורחינו
                                <img src="https://e.unicode-table.com/orig/c8/8d8213fdfc319115454d1a34b7b36e.png" alt="" height="20" />
                            </span>
                        </div>

                        <div className="parents">
                            <div className="parentsdetails">הורי הכלה<br />{eventInfo.brideParents}</div>
                            <div className="parentsdetails">הורי החתן<br />{eventInfo.groomParents}</div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default WeddingInvitation;