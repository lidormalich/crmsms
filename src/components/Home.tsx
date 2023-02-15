import { FunctionComponent } from "react";
import AllCampaign from "./AllCampaign";
import InvitationManager from "./InvitationManager";
import Login from "./Login";

interface HomeProps {
    setIsLogIn: Function;
    isLogin: boolean;
}

const Home: FunctionComponent<HomeProps> = ({ setIsLogIn, isLogin }) => {
    return (<>
        {isLogin ? <AllCampaign /> : <Login setIsLogIn={setIsLogIn} />}

    </>);
}

export default Home;