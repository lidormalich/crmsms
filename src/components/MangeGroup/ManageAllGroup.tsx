import { FunctionComponent, useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { isLoginGlobal } from "../../App";
import Login from "../Login";
import AllGroup from "./AllGroup";
import './AddGroup.css';
import Group from "../../interfaces/Group";
import AddGroup from "./AddGroup";


interface ManageAllGroupProps {
    groupChanged: boolean;
    setIsLogIn: Function;
    setGroupChanged: Function;
}

const ManageAllGroup: FunctionComponent<ManageAllGroupProps> = ({ setIsLogIn, groupChanged, setGroupChanged,
}) => {
    // let [allGroupItem, setAllGroupItem] = useState<Group[]>([]);
    let { eventId } = useParams();
    let isLogin = useContext<boolean>(isLoginGlobal);

    // let counter: number = 0;

    return (<>
        <div className="container">
            {isLogin ? (<>

                <div className="d-flex justify-content-center align-items-center">
                    <h5 className="display-5">All Group for event <Link to={`/campaign/${eventId}`}>To Event <i className="fa-solid fa-angles-right"></i></Link></h5>

                </div>
                <div className="row">
                    <div className="col-md-4">
                        <AddGroup setGroupChanged={setGroupChanged} groupChanged={groupChanged} />
                    </div>
                    <div className="col-md-8">
                        <AllGroup groupChanged={groupChanged} />
                    </div>
                </div>
            </>) : (<><Login setIsLogIn={setIsLogIn} />
            </>)}
        </div>

    </>);
}

export default ManageAllGroup;