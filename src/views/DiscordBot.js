import {Badge, Button, Col, ListGroup, Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {api_get} from "../utils/fetch";
import authContext from "../utils/authContext";
import handleFetchError from "../utils/handleFetchError";
import Loading from "../components/Loading";

const DiscordBot = () => {

    document.title = "ELSYS Helper | Discord Bot";

    const Auth = useContext(authContext);
    const [ serverStatus, setServerStatus ] = useState(undefined);
    const [ botStatus, setBotStatus ] = useState(undefined);
    const [ serverCount, setServerCount ] = useState(undefined);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        api_get('/status', Auth.token)
            .then(response => {
                setBotStatus(response.bot);
                setServerCount(response.servers);
                setServerStatus(true)
            })
            .catch(handleFetchError)
            .finally(() => setLoading(false));
    }, [Auth.token])

    return (
        <>
            <Row className="d-flex justify-content-center">
                <Col md={12}>
                    <h1 className="text-center mb-4">ELSYS HELPER BOT</h1>
                </Col>

                <Col md={12} className={'d-flex justify-content-center mt-5'}>
                    {
                        loading ?
                            <Loading/>
                            :
                            <ListGroup>
                                <ListGroup.Item variant={'primary'} className={'d-flex justify-content-between'}>
                                    <div className={'pe-3'}>Сървър{' '}</div>
                                    {
                                        serverStatus ?
                                            <Badge bg="success" pill>На Линия</Badge>
                                            :
                                            <Badge bg="danger" pill>Извън Линия</Badge>
                                    }
                                </ListGroup.Item>
                                <ListGroup.Item variant={'primary'} className={'d-flex justify-content-between'}>
                                    <div className={'pe-3'}>Discord Bot{' '}</div>
                                    {
                                        serverStatus ?
                                            <>{
                                                botStatus ?
                                                    <Badge bg="success" pill>На Линия</Badge>
                                                    :
                                                    <Badge bg="danger" pill>Извън Линия</Badge>
                                            }</>
                                            :
                                            <Badge bg={"danger"} pill>Недостъпно</Badge>
                                    }
                                </ListGroup.Item>
                                <ListGroup.Item variant={'primary'} className={'d-flex justify-content-between'}>
                                    <div className={'pe-3'}>Активни Discord Сървъри{' '}</div>
                                    {
                                        serverStatus ?
                                            <Badge bg="primary" pill>{serverCount}</Badge>
                                            :
                                            <Badge bg="danger" pill>Недостъпно</Badge>
                                    }
                                </ListGroup.Item>
                            </ListGroup>
                    }
                </Col>

                <Col md={12} className={'d-flex justify-content-center mt-5'}>
                    <a
                        href={'https://discord.com/api/oauth2/authorize?client_id=954418914463469569&permissions=8&scope=applications.commands%20bot'}
                        target={'_blank'} rel="noreferrer"
                    >
                        <Button>Линк за покана на Бота</Button>
                    </a>
                </Col>
            </Row>
        </>
    );
};

export default DiscordBot;
