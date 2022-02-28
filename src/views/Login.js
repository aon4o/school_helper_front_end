import Cookies from "js-cookie";
import {useContext, useEffect, useState} from "react";
import {api_post} from "../utils/fetch";
import {useNavigate} from "react-router-dom";
import {Button, Col, FloatingLabel, Form, Row} from "react-bootstrap";
import authContext from "../utils/authContext";
import {toast} from "react-toastify";

const Login = () => {
    document.title = "ELSYS Helper | Вход";

    const Auth = useContext(authContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (Auth.auth) {
            toast.info('Вече сте влезнали в профил!');
            navigate('/');
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        api_post('/login', {'email': email, 'password': password})
            .then((response) => {
                Cookies.set("token", response.access_token);
                Auth.setToken(response.access_token);
                Auth.setAuth(true);
                toast.success("Успешно влизане!")
                navigate('/');
            })
            .catch((error) => {
                if (error.detail !== undefined) {
                    toast.error(error.detail);
                } else {
                    toast.error(error.message);
                }
            });
    };

    return (
        <>
            <Row className="d-flex justify-content-center">
                <Col md={5}>
                    <h1 className="text-center mb-4">Вход</h1>
                    <Form onSubmit={handleSubmit} className="border border-3 border-primary rounded-3 p-3">
                        <FloatingLabel controlId="floatingInput" label="Имейл" className="mb-3">
                            <Form.Control id="inputEmail" className="border-primary" type={'email'} placeholder="name@example.com" value={email}
                                          onChange={(e) => setEmail(e.target.value)}
                            />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingPassword" label="Парола" className="mb-3">
                            <Form.Control type="password" className="border-primary" placeholder="Password" value={password}
                                          onChange={(e) => setPassword(e.target.value)} />
                        </FloatingLabel>

                        <Button variant="primary" type="submit">
                            Влизане
                        </Button>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default Login;