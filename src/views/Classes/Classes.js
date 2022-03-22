import {Alert, Badge, Button, Col, Container, Row, Table} from "react-bootstrap";
import {api_delete, api_get} from "../../utils/fetch";
import React, {useContext, useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faEdit, faExternalLink} from "@fortawesome/free-solid-svg-icons";
import {toast} from "react-toastify";
import {LinkContainer} from 'react-router-bootstrap';
import Loading from "../../components/Loading";
import authContext from "../../utils/authContext";
import {useNavigate} from "react-router";
import handleFetchError from "../../utils/handleFetchError";
import handleCopyClassKey from "../../utils/handleCopyClassKey";


const Classes = () => {

    document.title = "ELSYS Helper | Класове";

    const [classes, setClasses] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const Auth = useContext(authContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!Auth.auth) {
            toast.error('За да достъпите тази страница трябва да влезете в Профила си!');
            navigate('/login');
        }

        api_get("/classes", Auth.token)
            .then(response => setClasses(response))
            .catch(handleFetchError)
            .finally(() => setLoading(false));
    }, [Auth.auth, Auth.token, navigate])

    const deleteClass = (name, index) => {
        api_delete(`/classes/${name}/delete`, null, Auth.token)
            .then(() => {
                const new_list = [...classes];
                new_list.splice(index, 1);
                setClasses(new_list);
                toast.success(`Класът '${name}' беше успешно изтрит.`);
            })
            .catch(handleFetchError)
    }

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h1 className="text-center mb-4">Класове</h1>

                        <div className="d-flex justify-content-end mb-3">
                            <LinkContainer to={"/classes/create"}>
                                <Button variant="outline-primary rounded-mine shadow-mine">Добави Клас</Button>
                            </LinkContainer>
                        </div>

                        { classes === undefined ?
                            <Loading error={!loading}/>
                            :
                            <>
                                {
                                    classes.length === 0 ?
                                        <Alert variant={'info'}>
                                            <Alert.Heading className={'text-center my-3'}>
                                                Няма създадени Класове!
                                            </Alert.Heading>
                                        </Alert>
                                        :
                                        <Table striped borderless hover className="mb-5 rounded-mine shadow-mine">
                                            <thead>
                                            <tr>
                                                <th>Клас</th>
                                                <th>Класен Ръководител</th>
                                                <th>Ключ</th>
                                                <th>Discord</th>
                                                <th>Действия</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {classes.map((class_, index) => (
                                                    <tr key={index} className="text-center">
                                                        <td>{class_.name}</td>
                                                        <td>
                                                            {
                                                                class_.class_teacher ?
                                                                    <LinkContainer to={`/users/${class_.class_teacher.email}`}>
                                                                        <Button variant={'outline-primary'}>
                                                                            {class_.class_teacher.first_name} {class_.class_teacher.last_name}
                                                                        </Button>
                                                                    </LinkContainer>
                                                                    :
                                                                    <LinkContainer to={`${class_.name}/class_teacher`}>
                                                                        <Button variant={'outline-danger'}>Няма Класен ръководител</Button>
                                                                    </LinkContainer>
                                                            }
                                                        </td>
                                                        <td>
                                                            <Button variant={'outline-primary'} onClick={() => handleCopyClassKey(class_.name, Auth.token)}>
                                                                Копиране на Ключа
                                                            </Button>
                                                        </td>
                                                        <td>
                                                            <h4>{
                                                                class_.guild_id === null ?
                                                                    <Badge bg={'danger'} pill>Неактивен</Badge>
                                                                    :
                                                                    <Badge bg={'success'} pill>Активен</Badge>
                                                            }</h4>
                                                        </td>
                                                        <td>
                                                            <LinkContainer to={`${class_.name}`}>
                                                                <Button variant={"success"} className="m-1">
                                                                    <FontAwesomeIcon icon={faExternalLink} />
                                                                </Button>
                                                            </LinkContainer>
                                                            <LinkContainer to={`${class_.name}/edit`}>
                                                                <Button variant={"warning"} className="m-1">
                                                                    <FontAwesomeIcon icon={faEdit} />
                                                                </Button>
                                                            </LinkContainer>
                                                            <Button onClick={() => deleteClass(class_.name, index)} variant={"danger"} className="m-1">
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                            </tbody>
                                        </Table>
                                }
                            </>
                        }
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Classes;
