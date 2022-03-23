import {Badge, Button, Card} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import handleCopy from "../../utils/handleCopy";
import React from "react";
import {CopyToClipboard} from "react-copy-to-clipboard/src";

const UserCard = (props) => {
    const user = props.user;

    return (
        <>
            <Card text={'white'} bg={'primary'} className={'border-0 rounded-mine shadow-mine'}>
                <Card.Header className={'border-light'}>
                    {user.verified ?
                        <>{' '}<Badge pill bg={'primary'}>Потребител</Badge></>
                        :
                        <>{' '}<Badge pill bg={'warning'} text={'dark'}>Непотвърден</Badge></>
                    }
                    {user.admin ? <>{' '}<Badge pill bg={'danger'}>Админ</Badge></> : <></>}
                </Card.Header>
                <Card.Body className={'border-light'}>
                    <Card.Title>
                        {user.first_name} {user.last_name}
                    </Card.Title>
                    <Card.Text>
                        {
                            user.class_ ?
                            <>
                                Класен ръководител на{' '}
                                <LinkContainer to={`/classes/${user.class_.name}`}>
                                    <Button size={'sm'} variant={'primary'}>'{user.class_.name}'</Button>
                                </LinkContainer>
                            </>
                            :
                            <>НЕ е Класен Ръководител.</>
                        }
                    </Card.Text>
                </Card.Body>
                <Card.Footer className={'border-light'}>
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