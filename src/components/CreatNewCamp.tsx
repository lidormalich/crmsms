import { FunctionComponent, useContext } from "react";
import { siteTheme } from "../App";
import NotHaveAccess from "./Extra/NotHaveAccess";
import Login from "./Login";
import NewCampaign from "./NewCampaign";

interface CreatNewCampProps {

}

const CreatNewCamp: FunctionComponent<CreatNewCampProps> = () => {
    let isConnected = useContext(siteTheme);
    return (<>
        {isConnected ? <NewCampaign /> : <NotHaveAccess />}
    </>);
}

export default CreatNewCamp;
