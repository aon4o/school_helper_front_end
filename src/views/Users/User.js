import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useParams} from "react-router-dom";
import {Button, Col, Container, Row} from "react-bootstrap";
import {toast} from "react-toastify";
import {api_get} from "../../utils/fetch";
import authContext from "../../utils/authContext";
import Loading from "../../components/Loading";
import UserCard from "../../components/UserCard";
import handleFetchError from "../../utils/handleFetchError";
import Sticky from 'react-sticky-el';
import sidebarStickyStyle from '../../utils/sidebarStickyStyle';
import ClassesTable from "../../components/ClassesTable";


const User = () => {

    const { email } = useParams();
    const [ user, setUser ] = useState(undefined);
    const [ classes, setClasses ] = useState(undefined);
    const [ loadingUser, setLoadingUser ] = useState(true);
    const [ loadingClasses, setLoadingClasses ] = useState(true);

    const navigate = useNavigate();
    const Auth = useContext(authContext);

    document.title = `ELSYS Helper | ${email}`;

    useEffect(() => {
        if (!Auth.auth) {
            toast.error('За да достъпите тази страница трябва да влезете в Профила си!');
            navigate('/login');
        }

        api_get(`/users/${email}`, Auth.token)
            .then((response) => {setUser(response)})
            .catch((error) => {handleFetchError(error, () => navigate('/'))})
            .finally(() => {setLoadingUser(false)})
    }, [Auth.auth, Auth.token, email, navigate])

    useEffect(() => {
        if (user !== undefined) {
            api_get(`/users/${user.email}/classes`, Auth.token)
                .then(response => setClasses(response.classes))
                .catch(handleFetchError)
                .finally(() => setLoadingClasses(false))
        }
    }, [Auth.token, user])

    return (
        <>
            <Container>
                <Row>
                    <Col lg={12} md={12} className={'text-center'}>
                        <h1>Профил</h1>
                    </Col>
                    <Col lg={4} className={'justify-content-center mt-4'}>
                        <Sticky stickyStyle={sidebarStickyStyle}>
                            {
                                user === undefined
                                    ?
                                    <Loading error={!loadingUser}/>
                                    :
                                    <UserCard user={user}/>
                            }
                        </Sticky>
                    </Col>
                    <Col lg={8}>
                        <div className={'d-flex justify-content-end mt-4 mb-3'}>
                            <Button
                                variant={'outline-primary'}
                                className={'rounded-mine shadow-mine'}
                                onClick={() => navigate(-1)}>Назад</Button>
                        </div>
                        {
                            classes === undefined ?
                                <Loading error={!loadingClasses}/>
                                :
                                <ClassesTable
                                    classes={classes}
                                    setClasses={setClasses}
                                    alert={'Учителят не преподава на никой Клас!'}
                                    simple={true}
                                />
                        }
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default User;
