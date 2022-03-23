import {Col} from "react-bootstrap";
import React from "react";

const Title = (props) => {

    return (
        <Col lg={12} md={12} className={`text-center ${props.className}`}>
            <h1>{props.text}</h1>
        </Col>
    )
}

export default Title;