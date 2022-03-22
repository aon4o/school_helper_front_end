import {Col, Row} from "react-bootstrap";

const Instructions = () => {

    document.title = "ELSYS Helper | Инструкции";

    return (
        <>
            <Row className="d-flex justify-content-center">
                <Col md={12}>
                    <h1 className="text-center mb-4">Инструкции</h1>
                </Col>
                <Col className={'d-flex justify-content-center mt-5'}/>
            </Row>
        </>
    );
};

export default Instructions;
