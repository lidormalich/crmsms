import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoginGlobal } from "../../../App";
import NotHaveAccess from "../NotHaveAccess";
// import { isLoginGlobal } from "../../App";
// import UserInterface from "../../interface/UserInterface";
// import { getAllUserCards } from "../../services/cardServices";
// import { getUserInfo } from "../../services/usersservices";
// import NotHaveAccess from "../Extra/NotHaveAccess/NotHaveAccess";
import "./Profile.css";

interface ProfileProps {
  // setIsLoggedIn: Function;
}

const Profile: FunctionComponent<ProfileProps> = () => {
  let navigate = useNavigate();
  let isLogin = useContext<boolean>(isLoginGlobal);

  useEffect(() => {
    // try {
    //     let userId: number = JSON.parse(
    //         sessionStorage.getItem("userData") as string
    //     ).userID;
    //     getAllUserCards(userId).then((res) => setLength(res.data.length));
    //     getUserInfo(userId).then((res) => {
    //         // console.log(res.data);
    //         setUser(res.data)
    //     });
    // } catch (error) {
    //     console.log(error);
    // }
  }, []);

  return (
    <>
      {isLogin ? (
        <>
          <div className='container my-3'>
            <div className='card-container mx-auto'>
              <span className='pro'> Free Account</span>
              <img
                src='https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max'
                alt='ANONYMOUS USER'
                className='round mx-auto d-block my-3'
                style={{ width: "17em" }}
              />
              <h3>{sessionStorage.getItem("userName")}</h3>
              <h6></h6>
              <p>
                Can make and edit all Event <br /> Can Send free sms from web
              </p>
              <div className='buttons mx-2 my-3'>
                {/* <div className=" button primary ghost my-3">
                            You have E Events
                        </div> */}
                <button
                  className='primary'
                  onClick={() => {
                    navigate("/allcampaign");
                  }}>
                  Make More Events
                </button>
              </div>
              <div className='by'>
                <p className=''>Free Account</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <NotHaveAccess />
      )}
    </>
  );
};

export default Profile;
