import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {Button, Col, Container, Row} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {toast} from "react-toastify";
import {api_delete, api_get} from "../../utils/fetch";
import authContext from "../../utils/authContext";
import Loading from "../../components/Loading";
import UserCard from "../../components/UserCard";
import handleLogout from "../../utils/handleLogout";
import handleFetchError from "../../utils/handleFetchError";
import Sticky from 'react-sticky-el';
import sidebarStickyStyle from '../../utils/sidebarStickyStyle';


const Me = () => {

    const [ user, setUser ] = useState(undefined);
    const [ loadingUser, setLoadingUser ] = useState(true);

    const navigate = useNavigate();
    const Auth = useContext(authContext);

    document.title = `ELSYS Helper | Моят Профил`;

    // GETTING THE CURRENT'S CLASS DETAILS
    useEffect(() => {
        if (!Auth.auth) {
            toast.error('За да достъпите тази страница трябва да влезете в Профила си!');
            navigate('/login');
        }

        api_get(`/users/me`, Auth.token)
            .then((response) => {setUser(response)})
            .catch(handleFetchError)
            .finally(() => {setLoadingUser(false)})
    }, [Auth.auth, Auth.token, navigate])

    const handleDelete = () => {
        api_delete(`/users/me/delete`, null, Auth.token)
            .then(() => {
                navigate('/');
                handleLogout(Auth);
                toast.success("Успешно изтрихте Профила си!");
            })
    }

    return (
        <>
            <Container>
                <Row>
                    <Col lg={12} md={12} className={'text-center'}>
                        <h1>Моят Профил</h1>
                    </Col>
                    <Col lg={4} className={'justify-content-center mt-4'}>
                        <Sticky stickyStyle={sidebarStickyStyle}>
                            {
                                user === undefined
                                    ?
                                    <Loading error={!loadingUser}/>
                                    :
                                    <>
                                        <UserCard user={user}/>
                                        <div className={'mt-3 d-flex justify-content-around'}>
                                            <LinkContainer to={'edit'}>
                                                <Button variant={'warning'} className={'flex-fill rounded-mine shadow-mine'}>Промяна</Button>
                                            </LinkContainer>
                                            <div className={'mx-1'}/>
                                            <Button variant={'danger'} className={'flex-fill rounded-mine shadow-mine'} onClick={() => handleDelete()}>Изтриване</Button>
                                        </div>
                                    </>
                            }
                        </Sticky>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Me;
