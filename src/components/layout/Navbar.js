import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {LinkContainer} from 'react-router-bootstrap'

const NavBar = () => {
    return (
        <Navbar sticky={'top'} bg="primary" expand="lg" variant={"dark"}>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>ELSYS Helper</Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav" className={"d-flex justify-content-end"}>
                    <Nav className="align-self-end">
                        <LinkContainer to="/classes">
                            <Nav.Link>Класове</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/subjects">
                            <Nav.Link>Предмети</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="#">
                            <Nav.Link>Discord Bot</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="#">
                            <Nav.Link>Инструкции</Nav.Link>
                        </LinkContainer>
                    </Nav>

                    <Nav className="align-self-end ms-5">
                        <LinkContainer to="/login">
                            <Nav.Link>Вход</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/register">
                            <Nav.Link>Регистрация</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
};

export default NavBar;
