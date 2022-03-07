import {Alert, Button, Card} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import handleCopy from "../utils/handleCopy";
import React from "react";
import {CopyToClipboard} from "react-copy-to-clipboard/src";

const ClassCard = (props) => {
    const class_ = props.class_;

    return (
        <>
            <Card text={'white'} bg={'primary'} className={'border-0'}>
                <Card.Body>
                    <Card.Title>{class_.name}</Card.Title>
                    <Card.Text>
                        {
                            class_.class_teacher ?
                                <>
                                    Класен ръководител:
                                    <LinkContainer to={`/users/${class_.class_teacher.email}`}>
                                        <Button size={'sm'} variant={'primary'}>
                                            {class_.class_teacher.first_name} {class_.class_teacher.last_name}
                                        </Button>
                                    </LinkContainer>
                                </>
                                :
                                <Alert variant={'danger'} className={'text-danger mb-0'}>Няма класен ръководител</Alert>
                        }
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    Ключ за Discord:
                    <CopyToClipboard className={'ms-2'} text={class_.key} onCopy={(text, status) => handleCopy(text, status)}>
                        <Button size={'md'} variant={'primary'}>Копиране</Button>
                    </CopyToClipboard>
                </Card.Footer>
            </Card>
        </>
    )
}

export default ClassCard;