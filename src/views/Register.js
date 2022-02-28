import {useState} from "react";
import {api_post} from "../utils/fetch";
import {Button, Col, FloatingLabel, Form, Row} from "react-bootstrap";
import {toast} from "react-toastify";
import {useNavigate} from "react-router";

function Register() {
    document.title = "ELSYS Helper | Регистрация";

    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            'first_name': firstName,
            'last_name': lastName,
            'email': email,
            'password': password,
        };

        api_post('/register', data)
            .then(() => {
                toast.success('Регистрацията Ви бе успешна!');
                navigate('/login')
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
                    <h1 className="text-center mb-4">Регистрация</h1>
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

                        <FloatingLabel label="Парола" className="mb-3">
                            <Form.Control type="password" className="border-primary" placeholder="Password"
                                          value={password} onChange={e => setPassword(e.target.value)}
                            />
                        </FloatingLabel>

                        <FloatingLabel label="Потвърди Паролата" className="mb-3">
                            <Form.Control type="password" className="border-primary" placeholder="Confirm Password"
                                          value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </FloatingLabel>

                        <Button variant="primary" type="submit">
                            Регистриране
                        </Button>
                    </Form>
                </Col>
            </Row>

        </>
    );
}

export default Register;