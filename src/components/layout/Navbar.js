import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {LinkContainer} from 'react-router-bootstrap'
import {useContext, useEffect, useState} from "react";
import authContext from "../../utils/authContext";
import {useNavigate} from "react-router";
import getUserScope from "../../utils/getUserScope";
import handleLogout from "../../utils/handleLogout";
import {toast} from "react-toastify";

const NavBar = () => {
    const Auth = useContext(authContext);
    const navigate = useNavigate();
    const [ userVerified, setUserVerified ] = useState(false);

    useEffect(() => {
        getUserScope(Auth.token)
            .then(scope => {
                switch (scope) {
                    case 'admin':
                    case 'user':
                        setUserVerified(true);
                        break;
                    default:
                        setUserVerified(false);
                        break;
                }
            })
    }, [Auth, Auth.token])

    const handleLogoutButton = () => {
        handleLogout(Auth);
        setUserVerified(false);
        toast.success('Успешно излезнахте от Профила си!');
        navigate('/');
    };

    return (
        <>
            <Navbar id={'navbar'} expand="lg" variant={"dark"}>
                <Container id={'navbar-container'} className={'bg-primary mt-3 px-3 py-2 rounded-3 border-3 border-primary'}>
                    <LinkContainer to="/">
                        <Navbar.Brand>ELSYS Helper</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav" className={"d-flex justify-content-end"}>
                        <Nav className="align-self-end">

                            {userVerified ?
                                <>
                                    <LinkContainer to="/classes">
                                        <Nav.Link>Класове</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/subjects">
                                        <Nav.Link>Предмети</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/users">
                                        <Nav.Link>Потребители</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/discord" className={'ms-5'}>
                                        <Nav.Link>Discord Bot</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/instructions">
                                        <Nav.Link>Инструкции</Nav.Link>
                                    </LinkContainer>
                                </>
                                :
                                <></>
                            }

                            {Auth.auth ?
                                <>
                                    <LinkContainer to="/users/me" className={'ms-5'}>
                                        <Nav.Link>Профил</Nav.Link>
                                    </LinkContainer>
                                    <Nav.Link onClick={() => handleLogoutButton()}>Изход</Nav.Link>
                                </>
                                :
                                <>
                                    <LinkContainer to="/login" className={'ms-5'}>
                                        <Nav.Link>Вход</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/register">
                                        <Nav.Link>Регистрация</Nav.Link>
                                    </LinkContainer>
                                </>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
};

export default NavBar;
