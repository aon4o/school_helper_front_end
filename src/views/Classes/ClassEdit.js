import {Button, Col, Container, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {api_get, api_put} from "../../utils/fetch";
import {useParams, useNavigate} from "react-router";
import authContext from "../../utils/authContext";
import handleFetchError from "../../utils/handleFetchError";
import Title from "../../components/Title";

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
            <Container>
                <Row className={'justify-content-center'}>
                    <Col lg={6} className={'mt-5'}>
                        <Title text={`Промяна на клас '${name}'`} className={'mt-5'}/>

                        <Form onSubmit={handleSubmit} className={'mt-5'}>
                            <InputGroup className="shadow-mine rounded-mine">
                                <FormControl
                                    placeholder="Ново име на Класа"
                                    value={new_name}
                                    className={'rounded-left'}
                                    onChange={(e) => setNewName(e.target.value)}
                                />
                                <Button type="submit" className={'rounded-right'} variant="primary">Запази</Button>
                            </InputGroup>
                        </Form>

                        <div className={'d-flex justify-content-center mt-5'}>
                            <Button variant={'outline-primary'} className={'rounded-mine shadow-mine'} onClick={() => navigate(-1)}>Назад</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ClassEdit;
