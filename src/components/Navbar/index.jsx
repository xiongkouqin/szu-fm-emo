import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logoutUser } from "../../redux/actionCreators/authActionCreators";

const NavbarComponent = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const { isLoggedIn, user } = useSelector(
        (state) => ({
            isLoggedIn: state.auth.isLoggedIn,
            user: state.auth.user,
        }),
        shallowEqual
    );

    const logout = () => {
        dispatch(logoutUser());
    };

    return (
        // <Navbar bg="dark" expand="lg" variant="dark">
        //   <Navbar.Brand
        //     as={Link}
        //     to="/"
        //     style={{ marginLeft: "60px", marginRight: "auto" }}
        //   >
        //     File Management System
        //   </Navbar.Brand>
        <div>
            <Navbar bg="blue" expand="lg" variant="dark" fixed="top"
                    style={{boxShadow: '0 2px 4px rgba(0,0,0,0.1)', height: '60px'}}>
                <Navbar.Brand as={Link} to="/" style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    marginLeft: '68px',
                    color: '#000000',
                    lineHeight: '80px'
                }}>
                    File Management System
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/login"
                                  style={{color: ' #000000', marginLeft: '660px', marginRight: '20px'}}>Login</Nav.Link>
                        <Nav.Link as={Link} to="/signup" style={{color: ' #000000'}}>Register</Nav.Link>

                    </Nav>
                </Navbar.Collapse>


                <Nav style={{marginRight: "60px"}}>
                    {isLoggedIn ? (
                        <>
                            <Nav.Link
                                className="text-white d-flex align-items-center justify-content-between"
                                style={{pointerEvents: "unset", cursor: "text"}}
                            >
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                style={{marginRight: "10px", marginLeft: "-10px"}}
                                className="text-primary"
                                to="/dashboard/profile"
                            >
                                <strong>{user.data.displayName}</strong>
                            </Nav.Link>
                            <Nav.Link
                                as={Button}
                                variant="success"
                                active
                                style={{marginRight: "5px"}}
                                size="sm"
                                onClick={() => history.push("/dashboard")}
                            >
                                Dashboard
                            </Nav.Link>
                            <Nav.Link
                                as={Button}
                                variant="primary"
                                active
                                style={{marginRight: "5px"}}
                                size="sm"
                                onClick={() => logout()}
                            >
                                Logout
                            </Nav.Link>
                        </>
                    ) : (
                        <>
                            {/*<Nav.Link*/}
                            {/*  as={Button}*/}
                            {/*  variant="primary"*/}
                            {/*  onClick={() => history.push("/login")}*/}
                            {/*  active*/}
                            {/*  style={{ marginRight: "5px" }}*/}
                            {/*  size="sm"*/}
                            {/*>*/}
                            {/*  Login*/}
                            {/*</Nav.Link>*/}
                            {/*<Nav.Link*/}
                            {/*  as={Button}*/}
                            {/*  variant="success"*/}
                            {/*  onClick={() => history.push("/signup")}*/}
                            {/*  active*/}
                            {/*  size="sm"*/}
                            {/*>*/}
                            {/*  Register*/}
                            {/*</Nav.Link>*/}
                        </>
                    )}
                </Nav>
            </Navbar>
            <img src="https://calm8.github.io/images/1.jpg" alt="Description" style={{width: '100%', height: 'auto'}} />
        </div>
    );
};

export default NavbarComponent;
