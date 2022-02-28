import {Button, Col, Container, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {api_get, api_put} from "../../utils/fetch";
import {useParams, useNavigate} from "react-router";
import authContext from "../../utils/authContext";
import handleFetchError from "../../utils/handleFetchError";

const ClassEdit = () => {

    const { name } = useParams();
    const navigate = useNavigate();

    document.title = `ELSYS Helper | ${name} | Настройки`;

    const [new_name, setNewName] = useState(name.toString());
    const Auth = useContext(authContext);

    useEffect(() => {
        if (!Auth.auth) {
            toast.error('За да достъпите тази страница трябва да влезете в Профила си!');
            navigate('/login');
        }

        // CHECKS IF THE CLASS TO BE EDITED EXISTS
        api_get(`/classes/${name}`, Auth.token)
            .catch((error) => {handleFetchError(error, () => navigate('/classes'))})
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        api_put(`/classes/${name}/edit`, {"name": new_name}, Auth.token)
            .then(() => {
                toast.success(`Името на Клас "${name}" беше променено на "${new_name}" успешно!`);
                navigate(`/classes/${new_name}/edit`);
            })
            .catch((error) => {
                if (error.detail !== undefined) {
                    toast.error(error.detail);
                } else {
                    toast.error(error.message);
                }
            });
    }

    return (
        <>
            <Container className={'small-component-margin'}>
                <Row className={'justify-content-center'}>
                    <Col lg={'6'}>
                        <h1 className="text-center mb-4">Промяна на клас '{name}'</h1>

                        <Form onSubmit={handleSubmit}>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Ново име на Класа"
                                    value={new_name}
                                    onChange={(e) => setNewName(e.target.value)}
                                />
                                <Button type="submit" variant="primary">Запази</Button>
                            </InputGroup>
                        </Form>

                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ClassEdit;
