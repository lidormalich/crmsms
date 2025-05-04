import { FunctionComponent } from "react";
import "./Laoding.css";
interface LoadingProps {
    stringToShow: string
}

const Loading: FunctionComponent<LoadingProps> = ({ stringToShow }) => {
    return (<>
        {/* <div className=".body">
            <div className="ring2">Loading
                <span className="span"></span>
            </div>
        </div> */}
        <div className="center">

            <h1 className="display-1">{stringToShow}</h1>
            <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
            </svg>
        </div>

    </>);
}

export default Loading;