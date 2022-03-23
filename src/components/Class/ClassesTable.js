import {Badge, Button, Table} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faExternalLink, faTrash} from "@fortawesome/free-solid-svg-icons";
import React, {useContext} from "react";
import {api_delete} from "../../utils/fetch";
import {toast} from "react-toastify";
import handleFetchError from "../../utils/handleFetchError";
import authContext from "../../utils/authContext";
import handleCopyClassKey from "../../utils/handleCopyClassKey";
import InfoAlert from "../InfoAlert";

const ClassesTable = (props) => {
    const {classes, setClasses, alert, simple} = props;
    const Auth = useContext(authContext);

    const deleteClass = (name, index) => {
        api_delete(`/classes/${name}/delete`, null, Auth.token)
            .then(() => {
                const new_list = [...classes];
                new_list.splice(index, 1);
                setClasses(new_list);
                toast.success(`Класът '${name}' беше успешно изтрит.`);
            })
            .catch(handleFetchError)
    }

    return (
        <>
            {
                classes.length === 0 ?
                    <InfoAlert text={alert}/>
                    :
                    <Table striped borderless hover className="mb-5 rounded-mine shadow-mine">
                        <thead>
                        <tr>
                            <th>Клас</th>
                            <th>Класен Ръководител</th>
                            {!simple && <th>Ключ</th>}
                            <th>Discord</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {classes.map((class_, index) => (
                                <tr key={index} className="text-center">
                                    <td>{class_.name}</td>
                                    <td>
                                        {
                                            class_.class_teacher ?
                                                <LinkContainer to={`/users/${class_.class_teacher.email}`}>
                                                    <Button variant={'outline-primary'}>
                                                        {class_.class_teacher.first_name} {class_.class_teacher.last_name}
                                                    </Button>
                                                </LinkContainer>
                                                :
                                                <LinkContainer to={`/classes/${class_.name}/class_teacher`}>
                                                    <Button variant={'outline-danger'}>Няма Класен ръководител</Button>
                                                </LinkContainer>
                                        }
                                    </td>
                                    {!simple &&
                                        <td>
                                            <Button variant={'outline-primary'} onClick={() => handleCopyClassKey(class_.name, Auth.token)}>
                                                Копиране на Ключа
                                            </Button>
                                        </td>
                                    }
                                    <td>
                                        <h4>{
                                            class_.guild_id === null ?
                                                <Badge bg={'danger'} pill>Неактивен</Badge>
                                                :
                                                <Badge bg={'success'} pill>Активен</Badge>
                                        }</h4>
                                    </td>
                                    <td>
                                        <LinkContainer to={`/classes/${class_.name}`}>
                                            <Button variant={"success"} className="m-1">
                                                <FontAwesomeIcon icon={faExternalLink} />
                                            </Button>
                                        </LinkContainer>
                                        {!simple &&
                                            <>
                                                <LinkContainer to={`/classes/${class_.name}/edit`}>
                                                    <Button variant={"warning"} className="m-1">
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Button>
                                                </LinkContainer>
                                                <Button onClick={() => deleteClass(class_.name, index)} variant={"danger"} className="m-1">
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </>
                                        }
                                    </td>
                                </tr>
                            )
                        )}
                        </tbody>
                    </Table>
            }
        </>

    )
}

export default ClassesTable;