import { FunctionComponent, useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { isLoginGlobal } from "../App";

interface NavBarProps {
    setIsLogIn: Function;

}

const NavBar: FunctionComponent<NavBarProps> = ({ setIsLogIn }) => {
    let navigate = useNavigate();
    let isLogin = useContext<boolean>(isLoginGlobal);


    return (<div className="bg-dark text-light">
        <NavLink to="/newcampaign">New Campaign</NavLink>

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/"><h5 className="display-5">CRM SMS invitation </h5></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/newcampaign">New Campaign</NavLink>
                        <NavLink to="/invitation">Invitation</NavLink>
                        <NavLink to="/allcampaign">All Campaign</NavLink>
                    </Nav>



                    {isLogin && <>
                        <Nav className="me-5">
                            <NavDropdown title={`Hi ${sessionStorage.getItem("userName")}`} id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/profile">
                                    Profile Info
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Item href="/" onClick={() => {
                                    sessionStorage.setItem("IsLoggedIn", "false");
                                    setIsLogIn(false);
                                    navigate("/");
                                }}>log-out
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav></>}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>);
}

export default NavBar;