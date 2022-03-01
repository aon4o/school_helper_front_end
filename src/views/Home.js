import {useContext, useEffect, useState} from "react";
import authContext from "../utils/authContext";
import {Alert, Col, Container, Row} from "react-bootstrap";

const Home = () => {

    document.title = "ELSYS Helper | Начало";

    let [scopeMessage, setScopeMessage] = useState("Зареждане...");
    let [alert, setAlert] = useState('info');
    const Auth = useContext(authContext);

    useEffect(() => {
        switch (Auth.scope) {
            case 'admin':
                setScopeMessage('Вие сте Админ.');
                setAlert('danger');
                break;
            case 'user':
                setScopeMessage('Вие сте Потребител.');
                setAlert('info');
                break;
            case '':
                setScopeMessage('Профилът Ви не е потвърден! Свържете се с Админ за да поправи това.');
                setAlert('warning');
                break;
            default:
                setScopeMessage('Не сте влезнали в Профила си!');
                setAlert('info');
                break;
        }
    }, [Auth, Auth.scope, Auth.token]);
    return (
        <>
            <Container>
                <Row>
                    <Col className={'text-center'}>
                        <h1>ELSYS Helper | Начало</h1>
                        <hr className={'my-5'}/>
                        <h4>За преглед на Класове, Предмети и Профили може да ползвате Навигацията отгоре.</h4>
                        <h4>За повече информация може да отидете на съответната страница.</h4>
                        <hr className={'my-5'}/>
                        <Alert variant={alert}>
                            <h2>{scopeMessage}</h2>
                        </Alert>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Home;