import { FunctionComponent } from "react";
import './NotHaveAccess.css';

interface NotHaveAccessProps {

}

const NotHaveAccess: FunctionComponent<NotHaveAccessProps> = () => {
    return (<>
        <div className="forbidden">
            <h2 className="display-2"> 403 Forbidden </h2>
            <i className="fa fa-exclamation-triangle logo" style={{ fontSize: "15em" }}>  </i>
            <hr />
        </div>
        <div className="forbidden">
            <h4> You do not have access to this resource. </h4>
            <h4>   Please contact your administrator/log-In to system for privileges  </h4>
        </div>
        {/* <div className="forbidden">
            <h2> <i className="fa fa-exclamation-triangle logo">  </i> 403 Forbidden </h2>
        </div> */}
    </>);
}

export default NotHaveAccess;