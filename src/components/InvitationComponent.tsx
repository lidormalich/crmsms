import { FunctionComponent, useContext, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { Link, useParams } from "react-router-dom";
import { isLoginGlobal } from "../App";
import People from "../interfaces/People";
import { getPeopleInEventByID } from "../services/eventServices";
import Dashboard from "./Extra/Dashboard";
import InvitationManager from "./InvitationManager";

interface InvitationComponentProps {
    peopleChange: boolean;
    setIsLogIn: Function;
    setpeopleChanged: Function;
}

const InvitationComponent: FunctionComponent<InvitationComponentProps> = ({ setIsLogIn, peopleChange, setpeopleChanged }) => {
    let isLogin = useContext<boolean>(isLoginGlobal);
    let [peopleArr, setPeopleArr] = useState<People[]>([]);
    // let [peopleArrCounter, setPeopleArrCounter] = useState<number[]>([]);
    let [countercome, setPcountercome] = useState<number>(0);
    let { eventId } = useParams();

    useEffect(() => {
        getPeopleInEventByID(eventId as string).then((res) => {
            setPeopleArr(res.data);
            // console.log(res.data);
        }).catch((e) => console.log(e))
    }, []);
    // useEffect(() => {
    //     let counter: number = 0;
    //     for (let a = 0; a <= peopleArr.length; a++) {
    //         counter = counter + peopleArr[a].NumberOfGuests;
    //     } setPcountercome(counter);
    // }, []);
    return (<>
        {/* {peopleArr.map((item) => setPcountercome(item.NumberOfGuests + countercome)) + ""} */}
        {isLogin && <><Dashboard letA={countercome + ""} letC={""} letb={""} />

            {isMobile && <>
                <Link className="btn btn-primary mx-2 col" to={`/savethedate/${eventId}`}>Save The Date</Link>
                <Link className="btn btn-primary mx-0 col" to={`/invitation/${eventId}`}>Online Invitation</Link>
            </>}



        </>}

        <InvitationManager setIsLogIn={setIsLogIn} setpeopleChanged={setpeopleChanged} peopleChange={peopleChange}
            setPcountercome={setPcountercome}
            countercome={countercome} />
    </>);
}

export default InvitationComponent;