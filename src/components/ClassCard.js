import {Alert, Button, Card} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import React, {useContext} from "react";
import handleCopyClassKey from "../utils/handleCopyClassKey";
import authContext from "../utils/authContext";

const ClassCard = (props) => {
    const class_ = props.class_;
    const Auth = useContext(authContext);

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
                    Ключ за Discord:{' '}
                    <Button variant={'primary'} onClick={() => handleCopyClassKey(class_.name, Auth.token)}>Копиране</Button>
                </Card.Footer>
            </Card>
        </>
    )
}

export default ClassCard;