import {Alert, Button, Card, Col, Container, Row, Table} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {api_get} from "../../utils/fetch";
import {useParams, useNavigate} from "react-router";
import Loading from "../../components/Loading";
import {LinkContainer} from "react-router-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExternalLink} from "@fortawesome/free-solid-svg-icons";
import handleCopy from "../../utils/handleCopy";
import {CopyToClipboard} from "react-copy-to-clipboard/src";
import authContext from "../../utils/authContext";
import handleFetchError from "../../utils/handleFetchError";


const Class = () => {

    const { name } = useParams();
    const [ class_, setClass ] = useState(undefined);
    const [ subjects, setSubjects ] = useState(undefined);
    const [ loadingClass, setLoadingClass ] = useState(true);
    const [ loadingSubjects, setLoadingSubjects ] = useState(true);

    const navigate = useNavigate();
    const Auth = useContext(authContext);

    document.title = `ELSYS Helper | ${name}`;

    useEffect(() => {
        if (!Auth.auth) {
            toast.error('За да достъпите тази страница трябва да влезете в Профила си!');
            navigate('/login');
        }

        api_get(`/classes/${name}`, Auth.token)
            .then((response) => {setClass(response)})
            .catch((error) => {handleFetchError(error, () => navigate('/classes'))})
            .finally(() => {setLoadingClass(false)})

        api_get(`/classes/${name}/subjects`, Auth.token)
            .then((response) => {setSubjects(response)})
            .catch((error) => {handleFetchError(error)})
            .finally(() => {setLoadingSubjects(false)})
    }, [Auth.auth, Auth.token, name, navigate])

    return (
        <>
            <Container>
                <Row>
                    <Col lg={4}>

                        {class_ === undefined ?
                            <Loading error={!loadingClass}/>
                            :
                            <Card text={'white'} bg={'primary'} className={'border-0'}>
                                <Card.Body>
                                    <Card.Title>{class_.name}</Card.Title>
                                    <Card.Text>
                                        {
                                            class_.class_teacher ?
                                                <>
                                                    Класен ръководител -
                                                    <LinkContainer to={`/users/${class_.class_teacher.email}`}>
                                                        <Button variant={'primary'}>
                                                            {class_.class_teacher.first_name} {class_.class_teacher.last_name}
                                                        </Button>
                                                    </LinkContainer>
                                                </>
                                                :
                                                <Alert variant={'danger'} className={'text-danger'}>Няма класен ръководител</Alert>
                                        }
                                    </Card.Text>
                                    Ключ за Discord -
                                    <CopyToClipboard className={'ms-2'} text={class_.key} onCopy={(text, status) => handleCopy(text, status)}>
                                        <Button variant={'primary'}>Копиране</Button>
                                    </CopyToClipboard>
                                </Card.Body>
                                <Card.Footer>Специалност - WIP</Card.Footer>
                            </Card>
                        }
                    </Col>

                    <Col lg={8}>
                        <div className={'d-flex justify-content-end mb-3'}>
                            <Button variant={'outline-primary'} className={'me-2'} onClick={() => navigate(-1)}>Назад</Button>
                            <LinkContainer to={`subjects`}>
                                <Button variant={'outline-primary'} className={'me-2'}>Задаване на Предмети</Button>
                            </LinkContainer>
                            <LinkContainer to={`class_teacher`}>
                                <Button variant={'outline-primary'}>Задаване на Класен ръководител</Button>
                            </LinkContainer>
                        </div>

                        {subjects === undefined ?
                            <Loading error={!loadingSubjects}/>
                            :
                            <Table striped bordered hover responsive className="mb-5">
                                <thead>
                                <tr>
                                    <th>Клас</th>
                                    <th>Учител</th>
                                    <th>Действия</th>
                                </tr>
                                </thead>
                                <tbody>
                                {subjects.map((subject, index) => (
                                    <tr key={index} className={'text-center'}>
                                        <td>{subject.name}</td>
                                        <td>WIP</td>
                                        <td>
                                            <LinkContainer to={`#`}>
                                                <Button variant={"success"} className="m-1">
                                                    <FontAwesomeIcon icon={faExternalLink} />
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        }


                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Class;
