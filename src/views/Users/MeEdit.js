import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {Button, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import {toast} from "react-toastify";
import {api_get, api_put} from "../../utils/fetch";
import authContext from "../../utils/authContext";
import Loading from "../../components/Loading";
import handleLogout from "../../utils/handleLogout";
import handleFetchError from "../../utils/handleFetchError";


const MeEdit = () => {

    const [ user, setUser ] = useState({});
    const [ loadingUser, setLoadingUser ] = useState(true);
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');

    const navigate = useNavigate();
    const Auth = useContext(authContext);

    document.title = `ELSYS Helper | Моят Профил | Настройки`;

    useEffect(() => {
        if (!Auth.auth) {
            toast.error('За да достъпите тази страница трябва да влезете в Профила си!');
            navigate('/login');
        }

        api_get(`/users/me`, Auth.token)
            .then((response) => {setUser(response)})
            .catch((error) => {
                if (error.detail !== undefined) {
                    toast.error(error.detail);
                    navigate('/');
                } else {
                    toast.error(error.message);
                }
            })
            .finally(() => {setLoadingUser(false)})
    }, [Auth.auth, Auth.token, navigate])

    useEffect(() => {
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setEmail(user.email);
    }, [user.email, user.first_name, user.last_name])

    const handleSubmit = (event) => {
        event.preventDefault();
        api_put('/users/me/edit', {first_name: firstName, last_name: lastName, email: email}, Auth.token)
            .then(() => {
                toast.success('Данните Ви бяха успешно променени!');
                if (user.email !== email) {
                    handleLogout(Auth);
                    navigate('/login');
                } else {
                    navigate('/users/me');
                }
            })
            .catch(handleFetchError)
    }

    return (
        <>
            <Container>
                <Row className={'justify-content-center'}>
                    <Col lg={12} className={'text-center'}>
                        <h1 className={'mb-4'}>Моят Профил | Настройки</h1>
                    </Col>
                    <Col md={5}>
                        {
                            Object.keys(user).length === 0
                                ?
                                <>
                                    <Loading error={!loadingUser}/>
                                </>
                                :
                                <Form onSubmit={handleSubmit} className="border border-3 border-primary rounded-3 p-3">
                                    <FloatingLabel label="Име" className="mb-3">
                                        <Form.Control id="inputFirstName" className="border-primary"
                                                      type="text" placeholder="First Name"
                                                      value={firstName} onChange={e => setFirstName(e.target.value)}
                                        />
                                    </FloatingLabel>

                                    <FloatingLabel label="Фамилия" className="mb-3">
                                        <Form.Control id="inputLastName" className="border-primary"
                                                      type="text" placeholder="Last Name"
                                                      value={lastName} onChange={e => setLastName(e.target.value)}
                                        />
                                    </FloatingLabel>

                                    <FloatingLabel label="Имейл Адрес" className="mb-3">
                                        <Form.Control id="inputEmail" className="border-primary"
                                                      type="email" placeholder="name@example.com"
                                                      value={email} onChange={e => setEmail(e.target.value)}
                                        />
                                    </FloatingLabel>

                                    <Button variant="primary" type="submit">
                                        Запази Промените
                                    </Button>
                                </Form>

                        }
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default MeEdit;
