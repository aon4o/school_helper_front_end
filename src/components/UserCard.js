import {Badge, Button, Card} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import handleCopy from "../utils/handleCopy";
import React from "react";
import {CopyToClipboard} from "react-copy-to-clipboard/src";

const UserCard = (props) => {
    const user = props.user;

    return (
        <>
            <Card bg={'primary'} text={'white'} border={'primary'}>
                <Card.Header>
                    {user.verified ?
                        <>{' '}<Badge pill bg={'primary'}>Потребител</Badge></>
                        :
                        <>{' '}<Badge pill bg={'warning'} text={'dark'}>Непотвърден</Badge></>
                    }
                    {user.admin ? <>{' '}<Badge pill bg={'danger'}>Админ</Badge></> : <></>}
                </Card.Header>
                <Card.Body>
                    <Card.Title>
                        {user.first_name} {user.last_name}
                    </Card.Title>
                    <Card.Text>
                        Класен ръководител на{' '}
                        <LinkContainer to={'/asd'}>
                            <Button size={'sm'} variant={'primary'}>Клас</Button>
                        </LinkContainer>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    Имейл:{' '}
                    <CopyToClipboard text={user.email} onCopy={(event => handleCopy(user.email, event))}>
                        <Button variant={'primary'} size={'sm'}>{user.email}</Button>
                    </CopyToClipboard>
                </Card.Footer>
            </Card>
        </>
    )
}

export default UserCard;