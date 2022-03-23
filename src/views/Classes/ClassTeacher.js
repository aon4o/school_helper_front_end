import {Button, Col, Container, Row} from "react-bootstrap";
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
import InfoAlert from "../../components/InfoAlert";
import Title from "../../components/Title";


const ClassTeacher = () => {

    const { name } = useParams();
    const navigate = useNavigate();
    const Auth = useContext(authContext);

    const [ class_, setClass ] = useState(undefined);
    const [ users, setUsers ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    document.title = `ELSYS Helper | ${name} | Класен`;

    useEffect(() => {
        if (!Auth.auth) {
            toast.error('За да достъпите тази страница трябва да влезете в Профила си!');
            navigate('/login');
        }

        api_get(`/classes/${name}`, Auth.token)
            .then((response) => {setClass(response);})
            .catch((error) => {handleFetchError(error, () => navigate('/classes'));})

        api_get(`/users`, Auth.token)
            .then((response) => {
                const free_teachers = [];
                response.forEach((user) => {
                    if (user.verified && user.class_ === null) {
                        free_teachers.push(user);
                    }
                })
                setUsers(free_teachers);

            })
            .catch(handleFetchError)
            .finally(() => setLoading(false))

    }, [Auth.auth, Auth.token, name, navigate])

    const handleSetClassTeacher = (email) => {
        api_put(`/classes/${class_.name}/class_teacher/set`, {email: email}, Auth.token)
            .then(() => {
                toast.success("Класният ръководител бе успешно зададен!");
                navigate(-1);
            })
            .catch(handleFetchError)
    }

    const handleRemoveClassTeacher = () => {
        api_delete(`/classes/${class_.name}/class_teacher/remove`, null, Auth.token)
            .then(() => {
                toast.success("Класният ръководител бе успешно премахнат!");
                navigate(-1);
            })
            .catch(handleFetchError)
    }

    return (
        <>
            <Container>
                <Row className={'justify-content-center'}>
                    <Col lg={10} className={'mb-4'}>
                        <Title text={`'${name}' клас`}/>
                        <div className={'d-flex justify-content-end'}>
                            <Button variant={'outline-primary rounded-mine shadow-mine'} onClick={() => navigate(-1)}>Назад</Button>
                        </div>
                    </Col>
                    <Col md={12}>
                        {
                            class_ === undefined || users === [] ?
                            <Loading error={!loading}/>
                                :
                                <>
                                    <h3 className={'text-center'}>Класен ръководител -{' '}
                                        {
                                            class_.class_teacher ?
                                                <>
                                                    <LinkContainer to={`/users/${class_.class_teacher.email}`}>
                                                        <Button size={'lg'} variant={'outline-primary'} className={'rounded-mine'}>
                                                            {class_.class_teacher.first_name} {class_.class_teacher.last_name}
                                                        </Button>
                                                    </LinkContainer>
                                                    {' '}
                                                    <Button size={'lg'} variant={'outline-danger'}
                                                            className={'rounded-mine'} onClick={handleRemoveClassTeacher}>
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
                                            <div className={'rounded-mine shadow-mine p-4'}>
                                            {
                                                users.map((user) => (
                                                    <Button variant={'primary'} className={'m-1'} onClick={() => handleSetClassTeacher(user.email)}>
                                                        {user.first_name} {user.last_name}
                                                    </Button>
                                                ))
                                            }
                                            </div>
                                            :
                                            <InfoAlert text={'Няма свободни учители!'}/>
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

export default ClassTeacher;
