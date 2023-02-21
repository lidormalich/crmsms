import { FunctionComponent, useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { isLoginGlobal } from "../App";

interface NavBarProps {
    setIsLogIn: Function;
}

const NavBar: FunctionComponent<NavBarProps> = ({ setIsLogIn }) => {
    let navigate = useNavigate();
    let isLogin = useContext<boolean>(isLoginGlobal);


    return (<div className="bg-dark text-light">

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Link className="navbar-brand" to="/"><h5 className="display-5">CRM SMS invitation </h5></Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link " to={"/newcampaign"}>New Campaign</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/invitation">Invitation</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/allcampaign">All Campaign</Link>
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
                                <li><Link className="dropdown-item" to="/action/3.3">Something</Link></li>
                                <li><Link className="dropdown-item" to="/" onClick={() => {
                                    sessionStorage.setItem("IsLoggedIn", "false");
                                    setIsLogIn(false);
                                    navigate("/");
                                }}>log-out</Link></li>
                            </ul>
                        </li>
                    </>}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div >);
}

export default NavBar;