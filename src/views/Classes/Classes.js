import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {api_delete, api_get} from "../../utils/fetch";
import {useContext, useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faEdit, faExternalLink} from "@fortawesome/free-solid-svg-icons";
import {toast} from "react-toastify";
import {LinkContainer} from 'react-router-bootstrap';
import Loading from "../../components/Loading";
import {CopyToClipboard} from "react-copy-to-clipboard/src";
import handleCopy from "../../utils/handleCopy";
import authContext from "../../utils/authContext";
import {useNavigate} from "react-router";
import handleFetchError from "../../utils/handleFetchError";


const Classes = () => {

    document.title = "ELSYS Helper | Класове";

    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const Auth = useContext(authContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!Auth.auth) {
            toast.error('За да достъпите тази страница трябва да влезете в Профила си!');
            navigate('/login');
        }

        api_get("/classes", Auth.token)
            .then(response => setClasses(response))
            .catch((error) => {handleFetchError(error)})
            .finally(() => setLoading(false));
    }, [Auth.auth, Auth.token, navigate])

    const deleteClass = (name, index) => {
        api_delete("/classes/" + name + "/delete", null, Auth.token)
            .then(() => {
                toast.success("Класът '"+ name +"' беше успешно изтрит.")
                const new_list = [...classes];
                new_list.splice(index, 1);
                setClasses(new_list);
            })
            .catch((error) => {handleFetchError(error)})
    }

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h1 className="text-center mb-4">Класове</h1>

                        <div className="d-flex justify-content-end mb-3">
                            <LinkContainer to={"/classes/create"}>
                                <Button variant="outline-primary">Добави Клас</Button>
                            </LinkContainer>
                        </div>

                        { classes.length === 0 ?
                            <div className={'text-center'}>
                                <Loading error={!loading}/>
                            </div>
                            :
                            <Table striped bordered hover responsive className="mb-5">
                                <thead>
                                <tr>
                                    <th>Клас</th>
                                    <th>Класен Ръководител</th>
                                    <th>Ключ</th>
                                    <th>Действия</th>
                                </tr>
                                </thead>
                                <tbody>
                                {classes.map((class_, index) => (
                                        <tr key={index} className="text-center">
                                            <td>{class_.name}</td>
                                            <td>
                                                WIP
                                            </td>
                                            <td>
                                                <CopyToClipboard text={class_.key} onCopy={(text, status) => handleCopy(text, status)}>
                                                    <Button variant={'outline-primary'}>Копиране на Ключа</Button>
                                                </CopyToClipboard>
                                            </td>
                                            <td>
                                                <LinkContainer to={`${class_.name}`}>
                                                    <Button variant={"success"} className="m-1">
                                                        <FontAwesomeIcon icon={faExternalLink} />
                                                    </Button>
                                                </LinkContainer>
                                                <LinkContainer to={`${class_.name}/edit`}>
                                                    <Button variant={"warning"} className="m-1">
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Button>
                                                </LinkContainer>
                                                <Button onClick={() => deleteClass(class_.name, index)} variant={"danger"} className="m-1">
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                )}
                                </tbody>
                            </Table>
                        }
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Classes;
