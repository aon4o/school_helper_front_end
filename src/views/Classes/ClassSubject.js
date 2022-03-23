import {Button, Card, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {api_get, api_post} from "../../utils/fetch";
import {useParams, useNavigate} from "react-router";
import Loading from "../../components/Loading";
import authContext from "../../utils/authContext";
import handleFetchError from "../../utils/handleFetchError";
import MessageCard from "../../components/MessageCard";
import InfoAlert from "../../components/InfoAlert";
import Sticky from 'react-sticky-el';
import sidebarStickyStyle from '../../utils/sidebarStickyStyle';


const ClassSubject = () => {

    const { class_name, subject_name } = useParams();
    const [ class_, setClass ] = useState(undefined);
    const [ classSubject, setClassSubject ] = useState(undefined);
    const [ messages, setMessages ] = useState(undefined);

    const [ loadingClass, setLoadingClass ] = useState(true);
    const [ loadingClassSubject, setLoadingClassSubject ] = useState(true);
    const [ loadingMessages, setLoadingMessages ] = useState(true);
    const [ waitingFetch , setWaitingFetch ] = useState(false);

    const [newMessageTitle, setNewMessageTitle] = useState("");
    const [newMessageText, setNewMessageText] = useState("");
    const [messagesChange, setMessagesChange] = useState(1);

    const navigate = useNavigate();
    const Auth = useContext(authContext);

    document.title = `ELSYS Helper | ${class_name} | ${subject_name}`;

    useEffect(() => {
        if (!Auth.auth) {
            toast.error('За да достъпите тази страница трябва да влезете в Профила си!');
            navigate('/login');
        }

        api_get(`/classes/${class_name}`, Auth.token)
            .then(response => setClass(response))
            .catch((error) => handleFetchError(error, () => navigate('/classes')))
            .finally(() => {setLoadingClass(false)})

        api_get(`/classes/${class_name}/subjects/${subject_name}`, Auth.token)
            .then(response => setClassSubject(response))
            .catch(handleFetchError)
            .finally(() => {setLoadingClassSubject(false)})
    }, [Auth.auth, Auth.token, class_name, navigate, subject_name])

    useEffect(() => {
        api_get(`/classes/${class_name}/subjects/${subject_name}/messages`, Auth.token)
            .then(response => setMessages(response.reverse()))
            .catch(handleFetchError)
            .finally(() => {
                setLoadingMessages(false);
                setWaitingFetch(false);
            })
    }, [Auth.token, class_name, subject_name, messagesChange])

    const handleCreateMessage = (e) => {
        e.preventDefault();
        setWaitingFetch(true);
        api_post(`/classes/${class_name}/subjects/${subject_name}/messages/create`,
            {"title": newMessageTitle, "text": newMessageText}, Auth.token)
            .then(() => {
                toast.success("Съобщението бе изпратено успешно!");
                setMessagesChange(messagesChange + 1);
            })
            .catch(error => {
                handleFetchError(error);
                setWaitingFetch(false);
            })
    }

    return (
        <>
            <Container>
                <Row>

                    <Col lg={4}>
                        <Sticky stickyStyle={sidebarStickyStyle}>
                            {class_ === undefined || classSubject === undefined ?
                                <Loading error={!loadingClass || !loadingClassSubject}/>
                                :
                                <Card text={'white'} bg={'primary'} className={'border-0 rounded-mine shadow-lg-mine'}>
                                    <Card.Body>
                                        <Card.Text>
                                            Клас - {class_name}
                                            <br/>
                                            Класен -
                                            {
                                                class_ && class_.class_teacher !== null ?
                                                    <>{' '}{class_.class_teacher.first_name}{' '}{class_.class_teacher.last_name}</>
                                                    :
                                                    <>{' '}Няма</>
                                            }
                                        </Card.Text>
                                        <hr/>
                                        <Card.Text>
                                            Предмет - {subject_name}
                                            <br/>
                                            Преподавател -
                                            {
                                                classSubject.teacher !== null ?
                                                    <>{' '}{classSubject.teacher.first_name}{' '}{classSubject.teacher.last_name}</>
                                                    :
                                                    <>{' '}Няма</>
                                            }
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            }
                            <Form onSubmit={handleCreateMessage} className={'mt-4 p-2 border border-2 border-primary rounded-mine shadow-lg-mine'}>
                                <FloatingLabel controlId="messageTitle" label="Заглавие">
                                    <Form.Control
                                        type={'title'}
                                        placeholder=" "
                                        value={newMessageTitle}
                                        onChange={e => setNewMessageTitle(e.target.value)}
                                    />
                                </FloatingLabel>
                                <FloatingLabel controlId="messageText" label="Съобщение" className={'mt-3'}>
                                    <Form.Control
                                        as="textarea"
                                        placeholder=" "
                                        style={{ height: '200px' }}
                                        value={newMessageText}
                                        onChange={e => setNewMessageText(e.target.value)}
                                    />
                                </FloatingLabel>
                                <Button variant="primary" type="submit" className={'mt-3'} disabled={waitingFetch}>
                                    Изпрати
                                </Button>
                            </Form>
                        </Sticky>
                    </Col>

                    <Col lg={8}>
                        <div className={'d-flex justify-content-end mb-3'}>
                            <Button
                                className={'rounded-mine shadow-mine'}
                                variant={'outline-primary'}
                                onClick={() => navigate(-1)}>Назад</Button>
                        </div>

                        {
                            messages === undefined || waitingFetch ?
                                <Loading error={!loadingMessages && !waitingFetch}/>
                                :
                                <>
                                    {messages.length === 0 &&
                                        <InfoAlert text={'Все още няма Материали и Съобщения за този предмет!'}/>
                                    }
                                    {messages.length !== 0 &&
                                        <>{messages.map((message, index) => (
                                            <MessageCard
                                                message={message}
                                                key={index}
                                                class_name={class_name}
                                                subject_name={subject_name}
                                                change={messagesChange}
                                                setChange={setMessagesChange}
                                            />
                                        ))}</>
                                    }
                                </>
                        }
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ClassSubject;
