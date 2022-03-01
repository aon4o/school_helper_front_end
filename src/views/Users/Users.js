import {Badge, Button, Col, Container, Row, Table} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {api_get} from "../../utils/fetch";
import {useNavigate} from "react-router";
import authContext from "../../utils/authContext";
import {LinkContainer} from "react-router-bootstrap";
import Loading from "../../components/Loading";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExternalLink} from "@fortawesome/free-solid-svg-icons";

const Users = () => {

    const [ users, setUsers ] = useState([]);
    const [ loadingUsers, setLoadingUsers ] = useState(true);

    const navigate = useNavigate();
    const Auth = useContext(authContext);

    document.title = `ELSYS Helper | Потребители`;

    // GETTING THE CURRENT'S CLASS DETAILS
    useEffect(() => {
        if (!Auth.auth) {
            toast.error('За да достъпите тази страница трябва да влезете в Профила си!');
            navigate('/login');
        }

        api_get(`/users`, Auth.token)
            .then((response) => {setUsers(response)})
            .catch((error) => {
                if (error.detail !== undefined) {
                    toast.error(error.detail);
                    navigate('/');
                } else {
                    toast.error(error.message);
                }
            })
            .finally(() => {setLoadingUsers(false)})
    }, [Auth.auth, Auth.token, navigate])

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h1 className="text-center mb-4">Потребители</h1>

                        {/*<div className="d-flex justify-content-end mb-3">*/}
                        {/*    <LinkContainer to={"/classes/create"}>*/}
                        {/*        <Button variant="outline-primary">Добави Клас</Button>*/}
                        {/*    </LinkContainer>*/}
                        {/*</div>*/}

                        { users.length === 0 ?
                            <Loading error={!loadingUsers}/>
                            :
                            <Table striped bordered hover responsive className="mb-5">
                                <thead>
                                <tr>
                                    <th>Име</th>
                                    <th>Имейл</th>
                                    <th>Класен ръководител на</th>
                                    <th>Права</th>
                                    <th>Действия</th>
                                </tr>
                                </thead>
                                <tbody>
                                {users.map((user, index) => (
                                        <tr key={index} className="text-center">
                                            <td>{user.first_name} {user.last_name}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                WIP
                                            </td>
                                            <td>
                                                <h4>
                                                    {user.verified ?
                                                        <Badge pill bg={'primary'}>Потребител</Badge>
                                                        :
                                                        <Badge pill bg={'warning'} text={'dark'}>Непотвърден</Badge>
                                                    }
                                                    {user.admin ?
                                                        <>
                                                            {' '}<Badge pill bg={'danger'}>Админ</Badge>
                                                        </>
                                                        :
                                                        <></>
                                                    }
                                                </h4>

                                            </td>
                                            <td>
                                                <LinkContainer to={`${user.email}`}>
                                                    <Button variant={"success"} className="m-1">
                                                        <FontAwesomeIcon icon={faExternalLink} />
                                                    </Button>
                                                </LinkContainer>
                                            </td>
                                        </tr>
                                    )
                                )}
                                </tbody>
                            </Table>
                        }
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Users;
