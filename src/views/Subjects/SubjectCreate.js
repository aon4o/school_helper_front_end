import {Button, Col, Container, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import React, {useState} from "react";
import {toast} from "react-toastify";
import {api_post} from "../../utils/fetch";
import {useNavigate} from "react-router-dom";

const SubjectCreate = () => {

    document.title = "ELSYS Helper | Нов Предмет";

    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        api_post("/subjects/create", {"name": name})
            .then(() => {toast.success("Предмет '"+name+"' беше добавен успешно!");})
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
                        <h1 className="text-center mb-4">Нов Предмет</h1>

                        <Form onSubmit={handleSubmit}>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Име на Предмета"
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

export default SubjectCreate;
