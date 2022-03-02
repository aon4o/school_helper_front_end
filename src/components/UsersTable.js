import {Alert, Badge, Button, Table} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExternalLink} from "@fortawesome/free-solid-svg-icons";
import React, {useContext} from "react";
import {api_put} from "../utils/fetch";
import {toast} from "react-toastify";
import handleFetchError from "../utils/handleFetchError";
import authContext from "../utils/authContext";
import {useNavigate} from "react-router";

const UsersTable = (props) => {
    const users = props.users;
    const Auth = useContext(authContext);
    const navigate = useNavigate();

    const handleMakeUser = (email) => {
        const scope = 'user';
        api_put(`/users/${email}/scope`, {scope: scope}, Auth.token)
            .then(() => {
                users.forEach((user) => {
                    if (user.email === email) {
                        console.log(email);
                        user.scope = scope;
                    }
                })
                navigate('/users')
                toast.success(`Потребител '${email}' е Потвърден успешно!`);
            })
            .catch(error => handleFetchError(error))
    }

    const handleMakeAdmin = (email) => {
        const body = {scope: 'admin'}
        api_put(`/users/${email}/scope`, body, Auth.token)
            .then(() => {
                toast.success(`Потребител '${email}' вече е Админ!`);
            })
            .catch(error => handleFetchError(error))

    }

    const handleNotVerified = (email) => {
        const body = {scope: ''}
        api_put(`/users/${email}/scope`, body, Auth.token)
            .then(() => {
                toast.success(`Потребител '${email}' вече е не е Потвърден!`);
            })
            .catch(error => handleFetchError(error))

    }

    return (
        <>
            {
                users.length > 0 ?
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
                        {
                            users.map((user, index) => (
                                <tr key={index} className="text-center">
                                    <td>{user.first_name} {user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        WIP
                                    </td>
                                    <td>
                                        <h4>
                                            {(user.verified && user.admin) &&
                                                <Badge pill bg={'danger'}>Админ</Badge>
                                            }
                                            {(user.verified && !user.admin) &&
                                                <Badge pill bg={'primary'}>Потребител</Badge>
                                            }
                                            {(!user.verified && !user.admin) &&
                                                <Badge pill bg={'warning'} text={'dark'}>Непотвърден</Badge>
                                            }
                                        </h4>

                                    </td>
                                    <td>
                                        <LinkContainer to={`${user.email}`}>
                                            <Button variant={"success"} className="m-1">
                                                <FontAwesomeIcon icon={faExternalLink} />
                                            </Button>
                                        </LinkContainer>
                                        {!user.verified &&
                                            <Button
                                                onClick={() => handleMakeUser(user.email)}
                                                variant={'primary'}>
                                                Потвърди
                                            </Button>
                                        }
                                        {
                                            user.verified && !user.admin ?
                                                <>
                                                    <Button variant={'warning'}
                                                            onClick={() => handleNotVerified(user.email)}>
                                                        <strike>Потвърди</strike>
                                                    </Button>
                                                    {' '}
                                                    <Button
                                                        variant={'danger'}
                                                        onClick={() => handleMakeAdmin(user.email)}>
                                                        Админ
                                                    </Button>
                                                </>
                                                :
                                                <></>
                                        }
                                        {
                                            user.admin &&
                                            <Button
                                                variant={'warning'}
                                                onClick={() => handleMakeUser(user.email)}>
                                                <strike>Админ</strike>
                                            </Button>
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                    :
                    <Alert variant={'info'} className={'text-center mt-5'}>
                        <h1 className={'mb-0'}>Няма Потребители в тази Категория.</h1>
                    </Alert>
            }

        </>
    )
}

export default UsersTable;