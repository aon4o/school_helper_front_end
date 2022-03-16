import {Alert, Button, Col, Container, Row} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {LinkContainer} from "react-router-bootstrap";
import {toast} from "react-toastify";
import {api_delete, api_get, api_put} from "../../utils/fetch";
import {useParams, useNavigate} from "react-router";
import Loading from "../../components/Loading";
import authContext from "../../utils/authContext";
import handleFetchError from "../../utils/handleFetchError";
import {faX} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const ClassSubjectTeacher = () => {

    const { class_name, subject_name } = useParams();
    const navigate = useNavigate();
    const Auth = useContext(authContext);

    const [ class_, setClass ] = useState(undefined);
    const [ classSubject, setClassSubject ] = useState(undefined);
    const [ users, setUsers ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    document.title = `ELSYS Helper | ${class_name}`;

    useEffect(() => {
        if (!Auth.auth) {
            toast.error('За да достъпите тази страница трябва да влезете в Профила си!');
            navigate('/login');
        }

        api_get(`/classes/${class_name}`, Auth.token)
            .then((response) => {setClass(response);})
            .catch((error) => {handleFetchError(error, () => navigate(-1))})

        api_get(`/classes/${class_name}/subjects/${subject_name}`, Auth.token)
            .then((response) => {setClassSubject(response);})
            .catch((error) => {handleFetchError(error, () => navigate(-1))})

        api_get(`/users`, Auth.token)
            .then((response) => {setUsers(response)})
            .catch((error) => {handleFetchError(error, () => navigate(-1))})
            .finally(() => setLoading(false))

    }, [Auth.auth, Auth.token, class_name, navigate, subject_name])

    const handleSetClassSubjectTeacher = (email) => {
        api_put(`/classes/${class_.name}/subjects/${classSubject.subject.name}/set_teacher`, {email: email}, Auth.token)
            .then(() => {
                toast.success(`Учител за предмет '${classSubject.subject.name}' бе успешно зададен!`);
                navigate(-1);
            })
            .catch((error) => handleFetchError(error))
    }

    const handleRemoveClassSubjectTeacher = () => {
        api_delete(`/classes/${class_.name}/subjects/${classSubject.subject.name}/remove_teacher`, null, Auth.token)
            .then(() => {
                toast.success(`Учителят по предмет '${classSubject.subject.name}' бе премахнат успешно!`);
                navigate(-1);
            })
            .catch((error) => handleFetchError(error))
    }

    return (
        <>
            <Container>
                <Row className={'justify-content-center'}>
                    <Col lg={10} className={'mb-4'}>
                        <h1 className="text-center">'{class_name}' клас - {subject_name}</h1>
                        <div className={'d-flex justify-content-end'}>
                            <Button variant={'outline-primary'} onClick={() => navigate(-1)}>Назад</Button>
                        </div>
                    </Col>
                    <Col md={12}>
                        {
                            classSubject === undefined || users === [] ?
                            <Loading error={!loading}/>
                                :
                                <>
                                    <h3 className={'text-center'}>Преподавател -{' '}
                                        {
                                            classSubject.teacher ?
                                                <>
                                                    <LinkContainer to={`/users/${classSubject.teacher.email}`}>
                                                        <Button size={'lg'} variant={'outline-primary'}>
                                                            {classSubject.teacher.first_name} {classSubject.teacher.last_name}
                                                        </Button>
                                                    </LinkContainer>
                                                    {' '}
                                                    <Button size={'lg'} variant={'outline-danger'} onClick={handleRemoveClassSubjectTeacher}>
                                                        <FontAwesomeIcon icon={faX} />
                                                    </Button>
                                                </>
                                                :
                                                <>Няма</>
                                        }
                                    </h3>
                                    <hr/>
                                    {
                                        users.length > 0 ?
                                            <>
                                            {
                                                users.map((user) => (
                                                    <Button variant={'primary'} className={'m-1'} onClick={() => handleSetClassSubjectTeacher(user.email)}>
                                                        {user.first_name} {user.last_name}
                                                    </Button>
                                                ))
                                            }
                                            </>
                                            :
                                            <Alert variant={'info'}>
                                                <h3 className={'text-center mb-0'}>Няма свободни учители!</h3>
                                            </Alert>
                                    }


                                </>
                        }
                    </Col>
                    <Col lg={10}>



                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ClassSubjectTeacher;
