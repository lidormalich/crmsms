import { FunctionComponent } from "react";

import "./WeddingInvitation.css";

interface WeddingInvitationProps {

}

const WeddingInvitation: FunctionComponent<WeddingInvitationProps> = () => {

    // <h1>Lloyd &amp; Diane's <span class="secondary">Wedding</span></h1>

    return (<>

        <div className="container wedding" style={{ textAlign: "center" }} dir={"rtl"}        >

            <div className=" d-flex justify-content-center align-items-center">
                {/* <header>
                    <h1 className="title">Lloyd &amp; Diane's <span className="secondary">Wedding</span></h1>
                </header> */}

                <div className="row">
                    <div className="col-md-12">
                        <div className="card davetiye shadow"><small className="text-end basad">בס"ד</small>
                            <div className="card-body text-center">



                                <span>
                                    <h1 className="isimler">לידור
                                        <img src="https://e.unicode-table.com/orig/c8/8d8213fdfc319115454d1a34b7b36e.png" alt="" height="35" />
                                        טליה</h1>
                                </span>

                                <h5 className="ust_text"><span><img src="https://e.unicode-table.com/orig/c8/8d8213fdfc319115454d1a34b7b36e.png" alt="" height="20" />
                                    מזמינים אתכם לחתונתם
                                    <img src="https://e.unicode-table.com/orig/c8/8d8213fdfc319115454d1a34b7b36e.png" alt="" height="20" /></span>

                                </h5>

                                <div className="row mt-3 justify-content-center" dir="rtl">
                                    <div className="col-md-12">
                                        <div className="row" style={{ alignItems: "center" }}>
                                            <div className="col-md-12 d-flex justify-content-center flex-start">

                                                <p className="mb-0 gun">
                                                    10:00
                                                </p>
                                                <p className="mb-0 zaman">
                                                    יום שישי, יוני 2021 שעה: 19:00 - 23:00
                                                    <br />
                                                    אולם החתונות SIMAY
                                                    <br />
                                                    כתובת אולם
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="row" style={{ alignItems: "center" }}>
                                            <div className="col-md-12 d-flex justify-content-center flex-start">
                                                <p className="kina mb-0"
                                                // style="margin-left: 12px;"
                                                >
                                                    SIDE B
                                                </p>
                                                <p className="mb-0 gun">
                                                    11:00
                                                </p>
                                                <p className="mb-0 zaman">
                                                    יום שבת, יוני 2021 שעה: 19:00 - 23:00
                                                    <br />אולם החתונות SIMAY
                                                    <br />כתובת
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="ust_text"><span><img src="https://e.unicode-table.com/orig/c8/8d8213fdfc319115454d1a34b7b36e.png" alt="" height="20" />
                                            נשמח לראותכם בין אורחינו
                                            <img src="https://e.unicode-table.com/orig/c8/8d8213fdfc319115454d1a34b7b36e.png" alt="" height="20" /></span>

                                        </h5>
                                        <div className="row mt-4" style={{ fontSize: "13px" }}>
                                            <div className="col pernetstle">
                                                <p className="mb-0 perentssmall">הורי החתן</p>
                                                <p className="mb-0 perentssmall">אהרון ואורה</p>
                                                <p className="mb-0 perentssmall">מליח</p>
                                            </div>
                                            <div className="col pernetstle">
                                                <p className="mb-0 perentssmall">הורי הכלה</p>
                                                <p className="mb-0 perentssmall">שלמה ומזל</p>
                                                <p className="mb-0 perentssmall">אנג'ל</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <p className="kina">
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, neque!
                                    </p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    </>);
}

export default WeddingInvitation;