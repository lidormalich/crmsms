import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotHaveAccess from "../NotHaveAccess";
// import { isLoginGlobal } from "../../App";
// import UserInterface from "../../interface/UserInterface";
// import { getAllUserCards } from "../../services/cardServices";
// import { getUserInfo } from "../../services/usersservices";
// import NotHaveAccess from "../Extra/NotHaveAccess/NotHaveAccess";
import "./Profile.css";

interface ProfileProps {
    // setIsLogIn: Function;
}

const Profile: FunctionComponent<ProfileProps> = () => {
    // let navigate = useNavigate();
    // let [length, setLength] = useState<number>(0);
    // let isLogin = useContext<boolean>(isLoginGlobal);
    // let [user, setUser] = useState<UserInterface>({
    //     id: 0,
    //     name: "string",
    //     email: "string",
    //     password: "string",
    //     location: "string",
    // });
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

    return (<>
        <p>hi</p>
        {/* {isLogin ? <>
            <div className="container my-3">
                <div className="card-container mx-auto">
                    <span className="pro">{user.isBusiness ? "Business" : "Regular"}</span>
                    {user.image != null ? <img src={user.image} alt={user.name} className="round mx-auto d-block my-3" style={{ width: "15rem" }} /> : <img src="https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max" alt="ANONYMOUS USER" className="round mx-auto d-block my-3" style={{ width: "17em" }} />}
                    <h3>{user.name}</h3>
                    <h6>{user.location}</h6>
                    <p>User interface designer and <br /> front-end developer</p>
                    <div className="buttons mx-2 my-3">

                        <div className=" button primary ghost my-3">
                            You have {length} cards
                        </div>
                        <button className="primary" onClick={() => {
                            navigate("/Profile/Edit");
                        }
                        }>
                            Edit Profile
                        </button>
                    </div>
                    <div className="by">
                        // <p>creat by lidor</p> 
        <p className="">{user.isBusiness ? "Business" : "Regular"}</p>
    </div>
                </div >

            </div >
        </> : (<NotHaveAccess />)} */}
    </>);
}


export default Profile;