import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { isLoginGlobal } from "../App";
import People from "../interfaces/People";
import { getPeopleInEventByID } from "../Services/eventServices";
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
    let [userRefresh, setuserRefresh] = useState<boolean>(false);

    let { eventId } = useParams();



    useEffect(() => {
        getPeopleInEventByID(eventId as string).then((res) => {
            setPeopleArr(res.data);
            // console.log(res.data);
        }).catch((e) => console.log(e))
    }, [userRefresh]);


    let refresh = () => {
        setuserRefresh(!userRefresh);
    }
    return (<>
        {isLogin && <>
            <Dashboard peopleArr={peopleArr} userRefresh={userRefresh} />



            <InvitationManager setIsLogIn={setIsLogIn} setpeopleChanged={setpeopleChanged} peopleChange={peopleChange} refresh={refresh} />
        </>}
    </>);
}

export default InvitationComponent;