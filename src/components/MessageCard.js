import {Badge, Card} from "react-bootstrap";

const MessageCard = (props) => {
    const message = props.message;

    return (
        <>
            <Card text={'white'} bg={'primary'} className={'border-0 mb-3'}>
                <Card.Body>
                    <Card.Title>{message.title}</Card.Title>
                    <Card.Text>
                        {message.text}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className={'d-flex justify-content-between'}>
                    <Badge bg="danger">{message.user.first_name} {message.user.last_name}</Badge>{' '}
                    <Badge bg="secondary">{message.created_at}</Badge>
                </Card.Footer>
            </Card>
        </>
    )
}

export default MessageCard;