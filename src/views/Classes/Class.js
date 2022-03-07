import {Alert, Button, Col, Container, Row, Table} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {api_get} from "../../utils/fetch";
import {useParams, useNavigate} from "react-router";
import Loading from "../../components/Loading";
import {LinkContainer} from "react-router-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faExternalLink} from "@fortawesome/free-solid-svg-icons";
import authContext from "../../utils/authContext";
import handleFetchError from "../../utils/handleFetchError";
import ClassCard from "../../components/ClassCard";


const Class = () => {

    const { name } = useParams();
    const [ class_, setClass ] = useState(undefined);
    const [ classSubjects, setClassSubjects ] = useState(undefined);
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
            .then((response) => {setClassSubjects(response)})
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
                            <ClassCard class_={class_}/>
                        }
                    </Col>

                    <Col lg={8}>
                        <div className={'d-flex justify-content-end mb-3'}>
                            <LinkContainer to={`subjects`} className={'me-2'}>
                                <Button variant={'outline-primary'}>Задаване на Предмети</Button>
                            </LinkContainer>
                            <LinkContainer to={`class_teacher`} className={'me-2'}>
                                <Button variant={'outline-primary'}>Задаване на Класен ръководител</Button>
                            </LinkContainer>
                            <Button variant={'outline-primary'} onClick={() => navigate(-1)}>Назад</Button>
                        </div>

                        {
                            classSubjects === undefined ?
                                <Loading error={!loadingSubjects}/>
                                :
                                <>{
                                    classSubjects.length === 0 ?
                                        <Alert variant={'info'}>
                                            <Alert.Heading className={'text-center my-3'}>
                                                Класът няма зададени предмети!
                                            </Alert.Heading>
                                        </Alert>
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
                                            {classSubjects.map((classSubject, index) => (
                                                <tr key={index} className={'text-center'}>
                                                    <td>{classSubject.subject.name}</td>
                                                    <td>
                                                        {
                                                            classSubject.teacher ?
                                                                <>
                                                                    {classSubject.teacher.first_name} {classSubject.teacher.last_name}
                                                                </>
                                                                :
                                                                <>Няма учител</>
                                                        }
                                                    </td>
                                                    <td>
                                                        <LinkContainer to={`#`}>
                                                            <Button variant={"success"} className="m-1">
                                                                <FontAwesomeIcon icon={faExternalLink} />
                                                            </Button>
                                                        </LinkContainer>
                                                        <LinkContainer to={`subjects/${classSubject.subject.name}/teacher`}>
                                                            <Button variant={"warning"} className="m-1">
                                                                <FontAwesomeIcon icon={faEdit} />
                                                            </Button>
                                                        </LinkContainer>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </Table>
                                }</>
                        }


                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Class;
