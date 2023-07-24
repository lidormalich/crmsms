import { FunctionComponent, useContext } from "react";
import { isLoginGlobal } from "../App";
import NotHaveAccess from "./Extra/NotHaveAccess";
import Login from "./Login";
import NewCampaign from "./NewCampaign";

interface CreatNewCampProps {

}

const CreatNewCamp: FunctionComponent<CreatNewCampProps> = () => {
    let isLogin = useContext<boolean>(isLoginGlobal);
    return (<>
        {isLogin ? <NewCampaign /> : <NotHaveAccess />}
    </>);
}

export default CreatNewCamp;
