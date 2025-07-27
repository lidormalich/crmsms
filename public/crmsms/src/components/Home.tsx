import { FunctionComponent, useContext } from "react";
import AllCampaign from "./AllCampaign";
import InvitationManager from "./InvitationManager";
import Login from "./Login";
import { isLoginGlobal } from "../App";

interface HomeProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const Home: FunctionComponent<HomeProps> = ({ setIsLoggedIn }) => {
  let isLogin = useContext<boolean>(isLoginGlobal);

  return (
    <>{isLogin ? <AllCampaign /> : <Login setIsLoggedIn={setIsLoggedIn} />}</>
  );
};

export default Home;
