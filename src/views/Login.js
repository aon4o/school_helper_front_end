import Cookies from "js-cookie";
import {useContext, useEffect, useState} from "react";
import {api_post} from "../utils/fetch";
import {useNavigate} from "react-router";
import {Button, Col, FloatingLabel, Form, Row} from "react-bootstrap";
import authContext from "../utils/authContext";
import {toast} from "react-toastify";
import handleFetchError from "../utils/handleFetchError";
import getUserScope from "../utils/getUserScope";
import Title from "../components/Title";

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
                getUserScope(response.access_token).then(scope => {Auth.setScope(scope)});
                toast.success("Успешно влизане!")
                navigate('/');
            })
            .catch(handleFetchError);
    };

    return (
        <>
            <Row className="d-flex justify-content-center">
                <Col md={5}>
                    <Title text={'Вход'} className={'mb-4'}/>
                    <Form onSubmit={handleSubmit} className="border border-3 border-primary shadow-lg-mine rounded-mine p-3">
                        <FloatingLabel label="Имейл" className="mb-3">
                            <Form.Control id="inputEmail" className="border-primary" type={'email'} placeholder="name@example.com" value={email}
                                          onChange={(e) => setEmail(e.target.value)}
                            />
                        </FloatingLabel>

                        <FloatingLabel label="Парола" className="mb-3">
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