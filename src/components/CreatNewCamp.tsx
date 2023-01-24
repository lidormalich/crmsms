import { FunctionComponent, useContext } from "react";
import { siteTheme } from "../App";
import Login from "./Login";
import NewCampaign from "./NewCampaign";
import NotHaveAccess from "./NotHaveAccess";

interface CreatNewCampProps {

}

const CreatNewCamp: FunctionComponent<CreatNewCampProps> = () => {
    let isConnected = useContext(siteTheme);
    return (<>
        {isConnected ? <NewCampaign /> : <NotHaveAccess />}
    </>);
}

export default CreatNewCamp;
