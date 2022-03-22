import {Alert} from "react-bootstrap";
import React from "react";

const InfoAlert = (props) => {

    return (
        <>
            <Alert variant={'info'} className={'shadow-mine rounded-mine'}>
                <Alert.Heading className={'text-center my-3'}>
                    {props.text}
                </Alert.Heading>
            </Alert>
        </>
    )
}

export default InfoAlert;