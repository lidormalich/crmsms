import { FunctionComponent, useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddPeople from "./AddPeople";
import InvitationTable from "./InvitationTable";
import Login from "./Login";
import { isLoginGlobal } from "../App";
import Dashboard from "./Extra/Dashboard";


interface InvitationManagerProps {
    peopleChange: boolean;
    setIsLogIn: Function;
    setpeopleChanged: Function;

    setPcountercome: Function;
    countercome: number;
}

const InvitationManager: FunctionComponent<InvitationManagerProps> = ({ setIsLogIn, peopleChange, setpeopleChanged,

    setPcountercome, countercome

}) => {
    // משתני עזר לרענון הקומפוננטה בלי רענון הדף
    let { eventId } = useParams();
    let isLogin = useContext<boolean>(isLoginGlobal);

    return (<>
        <div className="container">
            {isLogin ? (<>

                <div className="d-flex justify-content-center align-items-center">
                    <Link to={`/invitation/${eventId}`}>Online -Invitation</Link>
                    <h5 className="display-5">Guest for event</h5>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <AddPeople setpeopleChanged={setpeopleChanged} peopleChange={peopleChange} id={eventId as string} />
                    </div>
                    <div className="col-md-8">
                        <InvitationTable peopleChanged={peopleChange} setPeopleChanged={setpeopleChanged}

                            setPcountercome={setPcountercome}
                            countercome={countercome}


                        />
                    </div>
                </div>
            </>) : (<><Login setIsLogIn={setIsLogIn} /></>
            )}
        </div>
    </>);
}

export default InvitationManager;