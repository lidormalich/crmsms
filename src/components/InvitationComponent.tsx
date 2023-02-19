import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    // let [peopleArr, setPeopleArr] = useState<People[]>([]);
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
        {isLogin && <Dashboard letA={countercome + ""} letC={""} letb={""} />}

        <InvitationManager setIsLogIn={setIsLogIn} setpeopleChanged={setpeopleChanged} peopleChange={peopleChange} />

    </>);
}

export default InvitationComponent;