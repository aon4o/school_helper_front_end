import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {api_delete, api_get} from "../../utils/fetch";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faEdit, faExternalLink} from "@fortawesome/free-solid-svg-icons";
import {toast} from "react-toastify";
import {LinkContainer} from 'react-router-bootstrap';
import Loading from "../../components/Loading";


const Subjects = () => {

    document.title = "ELSYS Helper | Предмети";

    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api_get("/subjects")
            .then(response => setSubjects(response))
            .catch((error) => {
                if (error.detail !== undefined) {
                    toast.error(error.detail);
                } else {
                    toast.error(error.message);
                }
            })
            .finally(() => setLoading(false));
    }, [])

    const deleteSubject = (name, index) => {
        api_delete("/subjects/" + name + "/delete")
            .then(() => {
                toast.success("Предметът '"+ name +"' беше успешно изтрит.")
                const new_list = [...subjects];
                new_list.splice(index, 1);
                setSubjects(new_list);
            })
            .catch((e) => {
                console.log(e);
                toast.error(e.detail);
            })
    }

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h1 className="text-center mb-4">Предмети</h1>

                        <div className="d-flex justify-content-end mb-3">
                            <Button href="/subjects/create" variant="outline-primary">Добави Предмет</Button>
                        </div>

                        { subjects.length === 0 ?
                            <div className={'text-center'}>
                                <Loading error={!loading}/>
                            </div>
                            :
                            <Table striped bordered hover responsive className="mb-5">
                                <thead>
                                <tr>
                                    <th>Предмет</th>
                                    <th>Действия</th>
                                </tr>
                                </thead>
                                <tbody>
                                {subjects.map((subject, index) => (
                                        <tr key={index} className="text-center">
                                            <td>{subject.name}</td>
                                            <td>
                                                <LinkContainer to={`${subject.name}`}>
                                                    <Button variant={"success"} className="m-1">
                                                        <FontAwesomeIcon icon={faExternalLink} />
                                                    </Button>
                                                </LinkContainer>
                                                <LinkContainer to={`${subject.name}/edit`}>
                                                    <Button variant={"warning"} className="m-1">
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Button>
                                                </LinkContainer>
                                                <Button onClick={() => deleteSubject(subject.name, index)} variant={"danger"} className="m-1">
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

export default Subjects;
