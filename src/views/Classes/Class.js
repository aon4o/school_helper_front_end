import {Button, Col, Container, Row, Table} from "react-bootstrap";
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
import ClassCard from "../../components/Class/ClassCard";
import InfoAlert from "../../components/InfoAlert";
import Sticky from 'react-sticky-el';
import sidebarStickyStyle from '../../utils/sidebarStickyStyle';


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
            .catch(handleFetchError)
            .finally(() => {setLoadingSubjects(false)})
    }, [Auth.auth, Auth.token, name, navigate])

    return (
        <>
            <Container>
                <Row>
                    <Col lg={4}>
                        <Sticky stickyStyle={sidebarStickyStyle}>
                            {class_ === undefined ?
                                <Loading error={!loadingClass}/>
                                :
                                <ClassCard class_={class_}/>
                            }
                        </Sticky>
                    </Col>

                    <Col lg={8}>
                        <div className={'d-flex justify-content-end mb-3'}>
                            <LinkContainer to={`subjects`} className={'me-2 rounded-mine shadow-mine'}>
                                <Button variant={'outline-primary'}>Задаване на Предмети</Button>
                            </LinkContainer>
                            <LinkContainer to={`class_teacher`} className={'me-2 rounded-mine shadow-mine'}>
                                <Button variant={'outline-primary'}>Задаване на Класен ръководител</Button>
                            </LinkContainer>
                            <Button variant={'outline-primary'} className={'rounded-mine shadow-mine'} onClick={() => navigate(-1)}>Назад</Button>
                        </div>

                        {
                            classSubjects === undefined ?
                                <Loading error={!loadingSubjects}/>
                                :
                                <>{
                                    classSubjects.length === 0 ?
                                        <InfoAlert text={'Класът няма зададени предмети!'}/>
                                        :
                                        <Table striped borderless hover className="mb-5 rounded-mine shadow-mine">
                                            <thead>
                                            <tr>
                                                <th>Предмент</th>
                                                <th>Преподавател</th>
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
                                                                <LinkContainer to={`/users/${classSubject.teacher.email}`}>
                                                                    <Button variant={'outline-primary'}>
                                                                        {classSubject.teacher.first_name} {classSubject.teacher.last_name}
                                                                    </Button>
                                                                </LinkContainer>
                                                                :
                                                                <LinkContainer to={`subjects/${classSubject.subject.name}/teacher`}>
                                                                    <Button variant={'outline-danger'}>
                                                                        Няма Преподавател
                                                                    </Button>
                                                                </LinkContainer>
                                                        }
                                                    </td>
                                                    <td>
                                                        <LinkContainer to={`subjects/${classSubject.subject.name}`}>
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
