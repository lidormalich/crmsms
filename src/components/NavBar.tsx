import { FunctionComponent, useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { isBrowser } from "react-device-detect";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isLoginGlobal } from "../App";


interface NavBarProps {
    setIsLogIn: Function;
}

const NavBar: FunctionComponent<NavBarProps> = ({ setIsLogIn }) => {
    let navigate = useNavigate();
    const location = useLocation();



    let isLogin = useContext<boolean>(isLoginGlobal);

    let splice = (str: string) => {
        let splitted = str.split("/", 3);
        return (splitted[2]);
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
                <Container>
                    <Link className="navbar-brand " to="/" >
                        {isBrowser ? (<img alt="CRM SMS invitation" src="https://github.com/lidormalich/crmsms/blob/master/src/Images/CRMSMSIinvitation.png?raw=true" height={50} />) : (<h5 className="display-5 " style={{ textAlign: "center" }}>CRM SMS Invitation </h5>)}
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link " to={"/newcampaign"}>New Campaign</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/allcampaign">All Campaign</Link>
                                </li>
                                {/* {location.pathname.startsWith("/campaign/") && (<>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={`/group/${splice(location.pathname)}`}>Add Group</Link>
                                    </li></>)} */}
                                {(location.pathname.startsWith("/campaign/") && isBrowser) && (<>
                                    <li className="nav-item">
                                        <Link className="btn btn-primary mx-0 col" to={`/invitation/${splice(location.pathname)}`}>Online Invitation</Link>                                </li>
                                    <li className="nav-item">
                                        <Link className="btn btn-primary mx-2 col" to={`/savethedate/${splice(location.pathname)}`}>Save The Date</Link>
                                    </li>
                                </>)}
                                <li className="nav-item">
                                    <Link className="nav-link" to="/about">About</Link>
                                </li>

                            </ul>
                        </Nav>



                        {isLogin && <>
                            <li className="nav-item dropdown" style={{ listStyleType: "none" }}>
                                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {`Hi ${sessionStorage.getItem("userName")}`}
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/profile">Profile Info</Link></li>
                                    {/* <li><Link className="dropdown-item" to="/action/3.3">Something</Link></li> */}
                                    <li><Link className="dropdown-item" to="/" onClick={() => {
                                        sessionStorage.setItem("IsLoggedIn", "false");
                                        sessionStorage.removeItem("Authorization")
                                        setIsLogIn(false);
                                        navigate("/");
                                    }}>log-out</Link></li>
                                </ul>
                            </li>
                        </>}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>);
}

export default NavBar;