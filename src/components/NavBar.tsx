import { FunctionComponent, useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface NavBarProps {
    isLogin: boolean;
    setIsLogIn: Function;

}

const NavBar: FunctionComponent<NavBarProps> = ({ isLogin, setIsLogIn }) => {
    let navigate = useNavigate();

    return (<div className="bg-dark text-light">

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/home"><h3 className="display-3">CRM SMS invitation </h3></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/newcampaign">New Campaign</Nav.Link>
                        <Nav.Link href="/invitation">Invitation</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    {isLogin && <>
                        <Nav className="me-5">
                            <NavDropdown title={`Hi ${sessionStorage.getItem("userName")}`} id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/profile">
                                    Profile Info
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/" onClick={() => {
                                    sessionStorage.setItem("IsLoggedIn", "false");
                                    sessionStorage.removeItem("userName");
                                    navigate("/");
                                    setIsLogIn(false);
                                }}>log-out
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav></>}
                </Navbar.Collapse>
            </Container>
        </Navbar>


        {/* {isLogin && <>
            <h6>Welcome {sessionStorage.getItem("userName")}</h6>
            <button
                className="btn btn-info"
                onClick={() => {
                    sessionStorage.setItem("IsLoggedIn", "false");
                    sessionStorage.removeItem("userName");
                    navigate("/");
                    setIsLogIn(false);
                }}
            >
                Logout
            </button>
        </>} */}
    </div>);
}

export default NavBar;