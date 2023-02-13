import { FunctionComponent } from "react";
import "./WeddingInvitation.css";

interface WeddingInvitationProps {

}

const WeddingInvitation: FunctionComponent<WeddingInvitationProps> = () => {

    // <h1>Lloyd &amp; Diane's <span class="secondary">Wedding</span></h1>


    return (<>

        <div className="container wedding" style={{ textAlign: "center" }}        >
            <header>
                <h1 className="title">Lloyd &amp; Diane's <span className="secondary">Wedding</span></h1>
            </header>
            <div className="row">
                <div className="col-md-12">
                    <div className="card davetiye shadow">
                        <div className="card-body text-center">
                            <h1 className="isimler">Berkay<br /><span className="isimve">&</span><br />Özlem</h1>
                            <h5 className="ust_text">Düğünümüze Davetlisin</h5>
                            <div className="row mt-4" style={{ fontSize: "13px;" }}>
                                <div className="col">
                                    <p className="mb-0">Alper - Gülhan</p>
                                    <p>Kara</p>
                                </div>
                                <div className="col">
                                    <p className="mb-0">Abdullah - Gülşen</p>
                                    <p>Ayata</p>
                                </div>
                            </div>
                            <div className="row mt-3 justify-content-center">
                                <div className="col-md-12">
                                    <div className="row" style={{ alignItems: "center" }}>
                                        <div className="col-md-12 d-flex"
                                        // style={justify-content: "center;place-items: flex-start;"}
                                        >
                                            <p className="kina mb-0">
                                                Kına
                                            </p>
                                            <p className="mb-0 gun">
                                                10
                                            </p>
                                            <p className="mb-0 zaman">
                                                HAZİRAN 2021 CUMA SAAT : 19:00 - 23:00
                                                <br />
                                                SİMAY DÜĞÜN SALONU
                                                <br />
                                                MERKEZ MAH. ATATÜRK CAD. NO:18
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="row" style={{ alignItems: "center" }}>
                                        <div className="col-md-12 d-flex"
                                        // style="justify-content: center;place-items: flex-start;"
                                        >
                                            <p className="kina mb-0"
                                            // style="margin-left: 12px;"
                                            >
                                                Düğün
                                            </p>
                                            <p className="mb-0 gun">
                                                11
                                            </p>
                                            <p className="mb-0 zaman">
                                                HAZİRAN 2021 CUMARTESİ SAAT : 19:00 - 23:00<br />SİMAY DÜĞÜN SALONU<br />MERKEZ MAH. ATATÜRK CAD. NO:18
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>);
}

export default WeddingInvitation;