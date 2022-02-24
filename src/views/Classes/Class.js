import {Button, Card, Col, Container, ListGroup, Row, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {api_get} from "../../utils/fetch";
import {useParams, useNavigate} from "react-router-dom";
import Loading from "../../components/Loading";
import {LinkContainer} from "react-router-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExternalLink} from "@fortawesome/free-solid-svg-icons";
import handleCopy from "../../utils/handleCopy";
import {CopyToClipboard} from "react-copy-to-clipboard/src";


const Class = () => {

    const { name } = useParams();
    const navigate = useNavigate();
    const [ class_, setClass ] = useState(undefined);
    const [ subjects, setSubjects ] = useState(undefined);
    const [ loadingClass, setLoadingClass ] = useState(true);
    const [ loadingSubjects, setLoadingSubjects ] = useState(true);

    document.title = `ELSYS Helper | ${name}`;

    // GETTING THE CURRENT'S CLASS DETAILS
    useEffect(() => {
        api_get(`/classes/${name}`)
            .then((response) => {setClass(response)})
            .catch((error) => {
                if (error.detail !== undefined) {
                    toast.error(error.detail);
                    navigate('/classes');
                } else {
                    toast.error(error.message);
                }
            })
            .finally(() => {setLoadingClass(false)})

        api_get(`/classes/${name}/subjects`)
            .then((response) => {setSubjects(response)})
            .catch((error) => {
                if (error.detail !== undefined) {
                    toast.error(error.detail);
                } else {
                    toast.error(error.message);
                }
            })
            .finally(() => {setLoadingSubjects(false)})
    }, [name, navigate])

    return (
        <>
            <Container>
                <Row>
                    <Col lg={4}>

                        {class_ === undefined ?
                            <div className={'text-center'}>
                                <Loading error={!loadingClass}/>
                            </div>
                            :
                            <Card border={'primary'}>
                                {/*<Card.Header>Featured</Card.Header>*/}
                                <Card.Body>
                                    <Card.Title>{class_.name}</Card.Title>
                                    <Card.Text>
                                        Класен ръководител - WIP
                                    </Card.Text>
                                </Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>WIP</ListGroup.Item>
                                    <ListGroup.Item>WIP in</ListGroup.Item>
                                    <ListGroup.Item>WIP</ListGroup.Item>
                                </ListGroup>
                                <Card.Body>
                                    Ключ за Discord -
                                    <CopyToClipboard className={'ms-2'} text={class_.key} onCopy={(text, status) => handleCopy(text, status)}>
                                        <Button variant={'outline-primary'}>Копиране</Button>
                                    </CopyToClipboard>
                                </Card.Body>
                                <Card.Footer className="text-muted">Специалност - WIP</Card.Footer>
                            </Card>
                        }


                    </Col>
                    <Col lg={8}>
                        <div className={'d-flex justify-content-end mb-3'}>
                            <Button variant={'outline-primary'} className={'me-2'} onClick={() => navigate(-1)}>Назад</Button>
                            <LinkContainer to={`subjects`}>
                                <Button variant={'outline-primary'}>Задаване на Предмети</Button>
                            </LinkContainer>
                        </div>

                        {subjects === undefined ?
                            <div className={'text-center'}>
                                <Loading error={!loadingSubjects}/>
                            </div>
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
                                {subjects.map((subject, index) => (
                                    <tr key={index} className={'text-center'}>
                                        <td>{subject.name}</td>
                                        <td>WIP</td>
                                        <td>
                                            <LinkContainer to={`#`}>
                                                <Button variant={"success"} className="m-1">
                                                    <FontAwesomeIcon icon={faExternalLink} />
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        }


                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Class;
