import {Button, Col, Container, Row} from "react-bootstrap";
import {api_get} from "../../utils/fetch";
import React, {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {LinkContainer} from 'react-router-bootstrap';
import Loading from "../../components/Loading";
import authContext from "../../utils/authContext";
import {useNavigate} from "react-router";
import handleFetchError from "../../utils/handleFetchError";
import ClassesTable from "../../components/Class/ClassesTable";
import Title from "../../components/Title";


const Classes = () => {

    document.title = "ELSYS Helper | Класове";

    const [classes, setClasses] = useState(undefined);
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
            .catch(handleFetchError)
            .finally(() => setLoading(false));
    }, [Auth.auth, Auth.token, navigate])

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Title text={'Класове'} className={'mb-4'}/>

                        <div className="d-flex justify-content-end mb-3">
                            <LinkContainer to={"/classes/create"}>
                                <Button variant="outline-primary rounded-mine shadow-mine">Добави Клас</Button>
                            </LinkContainer>
                        </div>

                        { classes === undefined ?
                            <Loading error={!loading}/>
                            :
                            <ClassesTable
                                classes={classes}
                                setClasses={setClasses}
                                alert={"Няма създадени Класове!"}
                                simple={false}
                            />
                        }
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Classes;
