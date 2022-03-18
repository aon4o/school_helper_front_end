import {Badge, Button, Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import React, {useContext} from "react";
import authContext from "../utils/authContext";
import {api_delete} from "../utils/fetch";
import {toast} from "react-toastify";
import handleFetchError from "../utils/handleFetchError";

const MessageCard = (props) => {
    const message = props.message;
    const class_name = props.class_name;
    const subject_name = props.subject_name;
    const change = props.change;
    const setChange = props.setChange;
    const Auth = useContext(authContext);

    const handleDelete = () => {
        api_delete(`/classes/${class_name}/subjects/${subject_name}/messages/${message.id}/delete`, null, Auth.token)
            .then(() => {
                toast.success("Съобщението беше изтрито успешно!");
                setChange(change + 1);
            })
            .catch(handleFetchError)
    }

    return (
        <>
            <Card text={'white'} bg={'primary'} className={'border-0 mb-3'}>
                <Card.Body>
                    <Card.Title>
                        {message.title}
                        <Button onClick={handleDelete} variant={"danger"} size={'sm'} className={"float-end"}>
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </Card.Title>
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