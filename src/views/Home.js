import {useContext, useEffect, useState} from "react";
import authContext from "../utils/authContext";
import {Col, Container, Row} from "react-bootstrap";

const Home = () => {

    document.title = "ELSYS Helper | Начало";

    let [scopeMessage, setScopeMessage] = useState("Зареждане...");
    const Auth = useContext(authContext);

    useEffect(() => {
        console.log(Auth.scope)
        switch (Auth.scope) {
            case 'admin':
                setScopeMessage('Вие сте Админ.');
                break;
            case 'user':
                setScopeMessage('Вие сте Потребител.');
                break;
            case '':
                setScopeMessage('Профилът Ви не е потвърден! Свържете се с Админ за да поправи това.');
                break;
            default:
                setScopeMessage('Не сте влезнали в Профила си!');
                break;
        }
    }, [Auth.scope, Auth.token]);
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
                        <h3>{scopeMessage}</h3>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Home;