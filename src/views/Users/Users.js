import {Col, Container, Nav, Row, Tab} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {api_get} from "../../utils/fetch";
import {useNavigate} from "react-router";
import authContext from "../../utils/authContext";
import Loading from "../../components/Loading";
import UsersTable from "../../components/UsersTable";
import handleFetchError from "../../utils/handleFetchError";

const Users = () => {

    const [ users, setUsers ] = useState([]);
    const [ admins, setAdmins ] = useState([]);
    const [ verified, setVerified ] = useState([]);
    const [ unverified, setUnverified ] = useState([]);
    const [ loadingUsers, setLoadingUsers ] = useState(true);

    const navigate = useNavigate();
    const Auth = useContext(authContext);

    document.title = `ELSYS Helper | Потребители`;

    useEffect(() => {
        if (!Auth.auth) {
            toast.error('За да достъпите тази страница трябва да влезете в Профила си!');
            navigate('/login');
        }

        api_get(`/users`, Auth.token)
            .then((response) => {setUsers(response)})
            .catch(handleFetchError)
            .finally(() => {setLoadingUsers(false)})
    }, [Auth.auth, Auth.token, navigate])

    useEffect(() => {
        const new_admins = [];
        const new_verified = [];
        const new_unverified = [];
        for (const user of users) {
            if (user.admin) {
                new_admins.push(user);
            } else if (user.verified) {
                new_verified.push(user);
            } else {
                new_unverified.push(user);
            }
        }
        setAdmins(new_admins);
        setVerified(new_verified);
        setUnverified(new_unverified);
    }, [users])

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h1 className="text-center mb-4">Потребители</h1>

                        { users.length === 0 ?
                            <Loading error={!loadingUsers}/>
                            :
                            <>
                                <Tab.Container id="user-tabs" defaultActiveKey="all">
                                    <Nav variant="pills" className="d-flex justify-content-evenly mb-3">
                                        <Nav.Item>
                                            <Nav.Link eventKey="all">Всички</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="admins">Админи</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="users">Потвърдени</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="unverified">Непотвърдени</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="all">
                                            <UsersTable users={users} all_users={users} setAllUsers={setUsers}/>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="admins">
                                            <UsersTable users={admins} all_users={users} setAllUsers={setUsers}/>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="users">
                                            <UsersTable users={verified} all_users={users} setAllUsers={setUsers}/>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="unverified">
                                            <UsersTable users={unverified} all_users={users} setAllUsers={setUsers}/>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Tab.Container>
                            </>
                        }
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Users;
