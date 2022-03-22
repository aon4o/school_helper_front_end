import {Alert, Button, Col, Container, Row, Table} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {api_delete, api_get, api_post} from "../../utils/fetch";
import {useParams, useNavigate} from "react-router";
import Loading from "../../components/Loading";
import authContext from "../../utils/authContext";
import handleFetchError from "../../utils/handleFetchError";


const ClassSubjects = () => {

    const { name } = useParams();
    const navigate = useNavigate();
    const Auth = useContext(authContext);

    const [ class_, setClass ] = useState(undefined);
    const [ classSubjects, setClassSubjects ] = useState(undefined);
    const [ otherSubjects, setOtherSubjects ] = useState(undefined);

    const [ loadingClassSubjects, setLoadingClassSubjects ] = useState(true);
    const [ loadingOtherSubjects, setLoadingOtherSubjects ] = useState(true);
    const [ waitingResponse, setWaitingResponse ] = useState(false);

    document.title = `ELSYS Helper | ${name} | Предмети`;

    // GETTING THE CURRENT'S CLASS DETAILS
    useEffect(() => {
        if (!Auth.auth) {
            toast.error('За да достъпите тази страница трябва да влезете в Профила си!');
            navigate('/login');
        }

        api_get(`/classes/${name}`, Auth.token)
            .then((response) => {setClass(response)})
            .catch((error) => {handleFetchError(error, () => navigate('/classes'))});

        api_get(`/classes/${name}/subjects`, Auth.token)
            .then((response) => {setClassSubjects(response)})
            .catch(handleFetchError)
            .finally(() => setLoadingClassSubjects(false));

        api_get(`/subjects`, Auth.token)
            .then((response) => {setOtherSubjects(response)})
            .catch(handleFetchError)
            .finally(() => setLoadingOtherSubjects(false))
    }, [Auth.auth, Auth.token, name, navigate])

    const addSubject = (subject) => {
        setWaitingResponse(true);
        api_post(`/classes/${class_.name}/subjects/add`,{"name": subject.name}, Auth.token)
            .then(() => {
                toast.success(`Предмет '${subject.name}' беше успешно добавен на Клас ${class_.name}.`);
                setClassSubjects([...classSubjects, {subject: subject, teacher: null}]);
                setWaitingResponse(false);
            })
            .catch(handleFetchError)
    }

    const removeSubject = (subject) => {
        setWaitingResponse(true);
        api_delete(`/classes/${class_.name}/subjects/remove`,{"name": subject.name}, Auth.token)
            .then(() => {
                toast.success(`Предмет '${subject.name}' беше успешно премахнат от Клас ${class_.name}.`);
                const newClassSubjects = [...classSubjects];
                classSubjects.forEach((classSubject, index) => {
                    if (classSubject.subject.name === subject.name) {
                        newClassSubjects.splice(index, 1);
                    }
                })
                setClassSubjects(newClassSubjects);
                setWaitingResponse(false);
            })
            .catch(handleFetchError)
    }

    const checkClassHasSubject = (subjects, subject) => {
        let flag = false;
        subjects.forEach((subjectInJson) => {
            if (subjectInJson.subject.name === subject.name) {
                flag = true;
            }
        })
        return flag;
    }

    return (
        <>
            <Container>
                <Row className={'justify-content-center'}>
                    <Col lg={6}>
                        <h1 className="text-center mb-5">'{name}' клас - Предмети</h1>
                    </Col>
                    <Col lg={10}>
                        <div className={'d-flex justify-content-end mb-3'}>
                            <Button variant={'outline-primary'} onClick={() => navigate(-1)}>Назад</Button>
                        </div>

                        {
                            classSubjects === undefined || otherSubjects === undefined || waitingResponse ?
                                <Loading error={(!loadingClassSubjects || !loadingOtherSubjects) && !waitingResponse}/>
                                :
                                <>
                                    {otherSubjects.length === 0 &&
                                        <Alert variant={'info'}>
                                            <Alert.Heading className={'text-center my-3'}>
                                                Няма създадени Предмети!
                                            </Alert.Heading>
                                        </Alert>
                                    }

                                    {otherSubjects.length !== 0 &&
                                        <Table striped bordered hover responsive className="mb-5">
                                            <thead>
                                            <tr>
                                                <th>Предмет</th>
                                                <th>Действие</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {otherSubjects.map((subject, index) => (
                                                    <tr key={index} className="text-center">
                                                        <td>{subject.name}</td>
                                                        <td>
                                                            {checkClassHasSubject(classSubjects, subject) === true ?
                                                                <Button onClick={() => {removeSubject(subject)}} variant={"danger"}>Премахни</Button>
                                                                :
                                                                <Button onClick={() => {addSubject(subject)}} variant={"success"}>Добави</Button>
                                                            }
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

export default ClassSubjects;
