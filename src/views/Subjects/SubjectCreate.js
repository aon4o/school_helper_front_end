import {Button, Col, Container, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {api_post} from "../../utils/fetch";
import {useNavigate} from "react-router";
import authContext from "../../utils/authContext";
import handleFetchError from "../../utils/handleFetchError";

const SubjectCreate = () => {

    document.title = "ELSYS Helper | Нов Предмет";

    const [name, setName] = useState("");
    const navigate = useNavigate();
    const Auth = useContext(authContext);

    useEffect(() => {
        if (!Auth.auth) {
            toast.error('За да достъпите тази страница трябва да влезете в Профила си!');
            navigate('/login');
        }
    }, [Auth.auth, navigate])

    const handleSubmit = (event) => {
        event.preventDefault();
        api_post("/subjects/create", {"name": name}, Auth.token)
            .then(() => {toast.success("Предмет '"+name+"' беше добавен успешно!");})
            .catch(handleFetchError);
    }

    return (
        <>
            <Container className={'small-component-margin'}>
                <Row className={'justify-content-center'}>
                    <Col lg={'6'}>
                        <h1 className="text-center mb-4">Нов Предмет</h1>

                        <Form onSubmit={handleSubmit}>
                            <InputGroup className="mb-3 shadow-mine">
                                <FormControl
                                    placeholder="Име на Предмета"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <Button type="submit" variant="primary">Създай</Button>
                            </InputGroup>
                        </Form>

                        <div className={'d-flex justify-content-center'}>
                            <Button
                                variant={'outline-primary'}
                                className={'me-2 rounded-mine shadow-mine'}
                                onClick={() => navigate(-1)}>Назад</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default SubjectCreate;
