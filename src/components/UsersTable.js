import {Alert, Badge, Button, Table} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExternalLink} from "@fortawesome/free-solid-svg-icons";
import React, {useContext} from "react";
import {api_put} from "../utils/fetch";
import {toast} from "react-toastify";
import handleFetchError from "../utils/handleFetchError";
import authContext from "../utils/authContext";
import {CopyToClipboard} from "react-copy-to-clipboard/src";
import handleCopy from "../utils/handleCopy";

const UsersTable = (props) => {
    const {users, all_users, setAllUsers} = props;
    const Auth = useContext(authContext);

    const handleMakeUser = (email) => {
        api_put(`/users/${email}/scope`, {scope: 'user'}, Auth.token)
            .then(() => {
                const new_users = [...all_users];
                new_users.forEach((user) => {
                    if (user.email === email) {
                        user.verified = true;
                        user.admin = false;
                    }
                })
                setAllUsers(new_users);
                toast.success(`Потребител '${email}' е Потвърден успешно!`);
            })
            .catch(handleFetchError)
    }

    const handleMakeAdmin = (email) => {
        api_put(`/users/${email}/scope`, {scope: 'admin'}, Auth.token)
            .then(() => {
                const new_users = [...all_users];
                new_users.forEach((user) => {
                    if (user.email === email) {
                        user.verified = true;
                        user.admin = true;
                    }
                })
                setAllUsers(new_users);
                toast.success(`Потребител '${email}' вече е Админ!`);
            })
            .catch(handleFetchError)

    }

    const handleNotVerified = (email) => {
        api_put(`/users/${email}/scope`, {scope: ''}, Auth.token)
            .then(() => {
                const new_users = [...all_users];
                new_users.forEach((user) => {
                    if (user.email === email) {
                        user.verified = false;
                        user.admin = false;
                    }
                })
                setAllUsers(new_users);
                toast.success(`Потребител '${email}' вече е не е Потвърден!`);
            })
            .catch(handleFetchError)

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
                                    <td><div className={'d-flex justify-content-center align-content-center'}>
                                        <CopyToClipboard text={user.email} onCopy={handleCopy}>
                                            <Button variant={'outline-primary'}>
                                                {user.email}
                                            </Button>
                                        </CopyToClipboard>
                                    </div></td>
                                    <td>
                                        {
                                            user.class_ ?
                                                <>
                                                    <LinkContainer to={`/classes/${user.class_.name}`}>
                                                        <Button  variant={'outline-primary'}>{user.class_.name}</Button>
                                                    </LinkContainer>
                                                </>
                                                :
                                                <>Нe е Класен Ръководител.</>
                                        }
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