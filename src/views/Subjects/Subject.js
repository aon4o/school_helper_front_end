import {Card, Col, Container, ListGroup, Row, Table} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {api_get} from "../../utils/fetch";
import {useParams, useNavigate} from "react-router";
import authContext from "../../utils/authContext";
import handleFetchError from "../../utils/handleFetchError";


const Subject = () => {

    const { name } = useParams();
    const [ subject, setSubject ] = useState(undefined);

    document.title = `ELSYS Helper | ${name}`;

    const navigate = useNavigate();
    const Auth = useContext(authContext);

    // GETTING THE CURRENT'S SUBJECT DETAILS
    useEffect(() => {
        if (!Auth.auth) {
            toast.error('За да достъпите тази страница трябва да влезете в Профила си!');
            navigate('/login');
        }

        api_get(`/subjects/${name}`, Auth.token)
            .then((response) =>
            {
                setSubject(response);
            })
            .catch((error) => {handleFetchError(error, () => navigate('/subjects'));})
    }, [Auth.auth, Auth.token, name, navigate, setSubject])

    return (
        <>
            <Container>
                <Row>
                    <Col lg={4}>

                        <Card border={'primary'}>
                            <Card.Body>
                                <Card.Title>{subject === undefined ? 'Име на Предмета' : subject.name}</Card.Title>
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
                                <Card.Link href="#">Copy Class Key Button - WIP</Card.Link>
                                <Card.Link href="#">Another Link</Card.Link>
                            </Card.Body>
                            <Card.Footer className="text-muted">Специалност - WIP</Card.Footer>
                        </Card>


                    </Col>
                    <Col lg={8}>

                        <Table>

                        </Table>

                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Subject;
