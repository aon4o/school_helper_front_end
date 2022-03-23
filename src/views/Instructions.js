import {Col, Row} from "react-bootstrap";
import Title from "../components/Title";

const Instructions = () => {

    document.title = "ELSYS Helper | Инструкции";

    return (
        <>
            <Row className="d-flex justify-content-center">
                <Title text={'Инструкции'} className={'mb-4'}/>
                <Col className={'d-flex justify-content-center mt-5'}/>
            </Row>
        </>
    );
};

export default Instructions;
