import {Button, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {api_post} from "../../utils/fetch";
import {useNavigate} from "react-router";
import authContext from "../../utils/authContext";
import handleFetchError from "../../utils/handleFetchError";
import Title from "../../components/Title";

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
            <Row className={'justify-content-center py-5'}>
                <Col lg={6} className={'mt-5'}>
                    <Title text={'Нов Клас'} />
                    <Form onSubmit={handleSubmit} className={'mt-5'}>
                        <InputGroup className="shadow-mine rounded-mine">
                            <FormControl
                                placeholder="Име на Класа"
                                value={name}
                                className={'rounded-left'}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Button type="submit" variant="primary" className={'rounded-right'}>Създай</Button>
                        </InputGroup>
                    </Form>

                    <div className={'d-flex justify-content-center mt-5'}>
                        <Button variant={'outline-primary'} className={'rounded-mine shadow-mine'} onClick={() => navigate(-1)}>Назад</Button>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default ClassCreate;
