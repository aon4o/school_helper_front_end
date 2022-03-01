import React, {useContext, useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import {toast} from "react-toastify";
import {api_get} from "../../utils/fetch";
import authContext from "../../utils/authContext";
import Loading from "../../components/Loading";
import UserCard from "../../components/UserCard";
import handleFetchError from "../../utils/handleFetchError";


const User = () => {

    const { email } = useParams();
    const [ user, setUser ] = useState(undefined);
    const [ loadingUser, setLoadingUser ] = useState(true);

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

    return (
        <>
            <Container>
                <Row>
                    <Col lg={4} className={'justify-content-center mt-4'}>
                        {
                            user === undefined
                                ?
                                <Loading error={!loadingUser}/>
                                :
                                <UserCard user={user}/>
                        }
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default User;
