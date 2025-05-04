import { FunctionComponent, useContext } from "react";
import AllCampaign from "./AllCampaign";
import InvitationManager from "./InvitationManager";
import Login from "./Login";
import { isLoginGlobal } from "../App";


interface HomeProps {
    setIsLogIn: Function;
}

const Home: FunctionComponent<HomeProps> = ({ setIsLogIn }) => {
    let isLogin = useContext<boolean>(isLoginGlobal);

    return (<>
        {isLogin ? <AllCampaign /> : <Login setIsLogIn={setIsLogIn} />}

    </>);
}

export default Home;