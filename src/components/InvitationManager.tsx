import { FunctionComponent, useContext } from "react";
import InvitationTable from "./InvitationTable";
import Login from "./Login";
import { isLoginGlobal } from "../App";


interface InvitationManagerProps {
    peopleChange: boolean;
    setIsLogIn: Function;
    setpeopleChanged: Function;
    refresh: Function;
}

const InvitationManager: FunctionComponent<InvitationManagerProps> = ({ setIsLogIn, peopleChange, setpeopleChanged, refresh }) => {
    let isLogin = useContext<boolean>(isLoginGlobal);

    return (<>
        <div className="container">
            {isLogin ? (<>

                <div className="d-flex justify-content-center align-items-center">
                    <h5 className="display-5">Guest for event</h5>
                </div>
                <div className="row">

                    <InvitationTable peopleChanged={peopleChange} setPeopleChanged={setpeopleChanged} refreshDash={refresh} />
                </div>
                {/* </div> */}
            </>) : (<><Login setIsLogIn={setIsLogIn} /></>
            )}
        </div>
    </>);
}

export default InvitationManager;