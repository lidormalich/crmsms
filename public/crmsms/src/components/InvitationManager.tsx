import { FunctionComponent, useContext } from "react";
import InvitationTable from "./InvitationTable";
import Login from "./Login";
import { isLoginGlobal } from "../App";

interface InvitationManagerProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  peopleChange: boolean;
  setPeopleChanged: (changed: boolean) => void;
  refresh: () => void;
}

const InvitationManager: FunctionComponent<InvitationManagerProps> = ({
  setIsLoggedIn,
  peopleChange,
  setPeopleChanged,
  refresh,
}) => {
  let isLogin = useContext<boolean>(isLoginGlobal);

  return (
    <>
      <div className='container'>
        {isLogin ? (
          <>
            <div className='d-flex justify-content-center align-items-center'>
              <h5 className='display-5'>Guest for event</h5>
            </div>
            <div className='row'>
              <InvitationTable
                peopleChanged={peopleChange}
                setPeopleChanged={setPeopleChanged}
                refreshDash={refresh}
              />
            </div>
            {/* </div> */}
          </>
        ) : (
          <>
            <Login setIsLoggedIn={setIsLoggedIn} />
          </>
        )}
      </div>
    </>
  );
};

export default InvitationManager;
