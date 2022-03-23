import {Badge, Button, Col, ListGroup, Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {api_get} from "../utils/fetch";
import authContext from "../utils/authContext";
import handleFetchError from "../utils/handleFetchError";
import Loading from "../components/Loading";
import {CopyToClipboard} from "react-copy-to-clipboard/src";
import handleCopy from "../utils/handleCopy";

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
                            <ListGroup className={'shadow-mine rounded-mine'}>
                                <ListGroup.Item variant={'primary'} className={'d-flex justify-content-between py-4 px-5'}>
                                    <div className={'pe-3'}>Сървър{' '}</div>
                                    {
                                        serverStatus ?
                                            <Badge bg="success" pill>На Линия</Badge>
                                            :
                                            <Badge bg="danger" pill>Извън Линия</Badge>
                                    }
                                </ListGroup.Item>
                                <ListGroup.Item variant={'primary'} className={'d-flex justify-content-between py-4 px-5'}>
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
                                <ListGroup.Item variant={'primary'} className={'d-flex justify-content-between py-4 px-5'}>
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
                        href={process.env.REACT_APP_BOT_INVITE_LINK}
                        target={'_blank'} rel="noreferrer"
                    >
                        <Button className={'rounded-mine shadow-mine'}>Линк за покана на Бота</Button>
                    </a>
                    <CopyToClipboard text={process.env.REACT_APP_BOT_INVITE_LINK} onCopy={handleCopy}>
                        <Button className={'rounded-mine shadow-mine ms-2'}>Копиране на Линка за покана на Бота</Button>
                    </CopyToClipboard>
                </Col>
            </Row>
        </>
    );
};

export default DiscordBot;
