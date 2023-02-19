import { FunctionComponent, useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Group from "../../interfaces/Group";
import { getAllGroup } from "../../services/GruopServices";
import { isLoginGlobal } from "../../App";
import AllGruop from "./AllGruop";
import Login from "../Login";

import './AddGruop.css';

interface AddGroupProps {
    setIsLogIn: Function;
}

const AddGroup: FunctionComponent<AddGroupProps> = ({ setIsLogIn }) => {
    let [allGroupItem, setAllGruopItem] = useState<Group[]>([]);
    let { eventId } = useParams();
    let isLogin = useContext<boolean>(isLoginGlobal);

    let counter: number = 0;
    // useEffect(() => {
    //     getAllGroup(eventId as string).then((res) => setAllGruopItem(res.data)).catch((e) => console.log(e));
    // }, []);
    return (<>
        {isLogin ? (<>

            <div className="d-flex justify-content-center align-items-center">
                <h5 className="display-5">All Gruop for event <Link to={`/campaign/${eventId}`}>{eventId}</Link></h5>
            </div>
            {/* <div className="container">
                <div className="row">
                    <div className="col-md-4" >
                        <h1><span className="counter">2,523</span></h1>
                        <h3>Customers</h3>
                        <i className=" iItem fa fa-users"></i>
                    </div>
                    <div className="col-md-4">
                        <h1><span className="counter">63,075</span></h1>
                        <h3>Total Web Pages</h3>
                        <i className="iItem fa fa-desktop"></i>
                    </div>
                    <div className="col-md-4">
                        <h1><span className="counter">12,218</span></h1>
                        <h3>Cups Of Coffee</h3>
                        <i className="iItem fa fa-coffee"></i>
                    </div>
                </div>
            </div> */}
            <div className="row">
                <div className="col-md-4">
                    <AllGruop />
                </div>
                <div className="col-md-8">
                    {/* <AllGruop /><p>55555</p> */}
                </div>
            </div>
        </>) : (<><Login setIsLogIn={setIsLogIn} /></>
        )}

    </>);
}

export default AddGroup;