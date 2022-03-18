import {Button, Col, Container, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {api_post} from "../../utils/fetch";
import {useNavigate} from "react-router";
import authContext from "../../utils/authContext";
import handleFetchError from "../../utils/handleFetchError";

const ClassCreate = () => {

    document.title = "ELSYS Helper | Нов Клас";

    const [name, setName] = useState("");
    const Auth = useContext(authContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!Auth.auth) {
            toast.error('За да достъпите тази страница трябва да влезете в Профила си!');
            navigate('/login');
        }
    }, [Auth.auth, navigate])

    const handleSubmit = (event) => {
        event.preventDefault();
        api_post("/classes/create", {"name": name}, Auth.token)
            .then(() => {toast.success("Клас '"+name+"' беше добавен успешно!");})
            .catch(handleFetchError);
    }

    return (
        <>
            <Container className={'small-component-margin'}>
                <Row className={'justify-content-center'}>
                    <Col lg={'6'}>
                        <h1 className="text-center mb-4">Нов Клас</h1>

                        <Form onSubmit={handleSubmit}>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Име на Класа"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <Button type="submit" variant="primary">Създай</Button>
                            </InputGroup>
                        </Form>

                        <div className={'d-flex justify-content-center'}>
                            <Button variant={'outline-primary'} className={'me-2'} onClick={() => navigate(-1)}>Назад</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ClassCreate;
