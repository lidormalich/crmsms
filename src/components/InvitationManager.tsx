import { FunctionComponent, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Addbook from "./Addbook";
import InvitationTable from "./InvitationTable";
import Login from "./Login";

interface HomeProps {
    isLogin: boolean;
    peopleChange: boolean;
    setIsLogIn: Function;
    setpeopleChanged: Function;
}

const Home: FunctionComponent<HomeProps> = ({ isLogin, setIsLogIn, peopleChange, setpeopleChanged }) => {
    // משתני עזר לרענון הקומפוננטה בלי רענון הדף
    // eventId
    let { eventId } = useParams();

    return (<>
        {/* {console.log(eventId)} */}
        <div className="container">
            {isLogin ? (<>
                <div className="d-flex justify-content-center align-items-center">
                    <Link to={`/invitation/${eventId}`}>Online -Invitation</Link>
                    <h5 className="display-5">Guest for event</h5>
                </div>
                <div className="row">

                    <div className="col-md-4">
                        <Addbook setpeopleChanged={setpeopleChanged} peopleChange={peopleChange} id={eventId as string} />
                    </div>
                    <div className="col-md-8">
                        <InvitationTable peopleChanged={peopleChange} setPeopleChanged={setpeopleChanged} />
                    </div>
                </div>
            </>) : (<><Login setIsLogIn={setIsLogIn} /></>
            )}
        </div>
    </>);
}

export default Home;