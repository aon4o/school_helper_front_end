import {Form, Button, Row, Col, FloatingLabel} from 'react-bootstrap';

const Login = () => {
    document.title = "ELSYS Helper | Register";

    return (
        <>
            <Row className="d-flex justify-content-center">
                <Col md={5}>
                    <h1 className="text-center mb-4">Register Form</h1>
                    <Form className="border border-3 border-primary rounded-3 p-3">
                        <FloatingLabel controlId="floatingFirstName" label="First Name" className="mb-3">
                            <Form.Control id="inputFirstName" className="border-primary" type="text" placeholder="First Name" />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingLastName" label="Last Name" className="mb-3">
                            <Form.Control id="inputLastName" className="border-primary" type="text" placeholder="Last Name" />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                            <Form.Control id="inputEmail" className="border-primary" type="email" placeholder="name@example.com" />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                            <Form.Control type="password" className="border-primary" placeholder="Password" />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password" className="mb-3">
                            <Form.Control type="password" className="border-primary" placeholder="Confirm Password" />
                        </FloatingLabel>

                        <Button variant="primary" type="submit">
                            LogIn
                        </Button>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default Login;
