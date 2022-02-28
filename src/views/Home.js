import {useContext, useEffect, useState} from "react";
import Cookies from "js-cookie";
import authContext from "../utils/authContext";
import {api_get} from "../utils/fetch";
import {useNavigate} from "react-router";
import handleFetchError from "../utils/handleFetchError";

const Home = () => {
    let [data, setData] = useState("");
    const Auth = useContext(authContext);
    const navigate = useNavigate();

    const handleClick = () => {
        Auth.setAuth(false);
        Cookies.remove("token");
    };


    useEffect(() => {
        let x = api_get("http://127.0.0.1:8000/test", Auth.token)
            .then((response) => {
                setData(response.data);
            })
            .catch(error => {
                handleFetchError(error);
            });
        console.log(x);
    }, [Auth.token, navigate]);
    return (
        <>
            <h2>Home</h2>
            {Auth.auth ?
                <button onClick={handleClick}>Logout</button>
                :
                <span>asd</span>
            }
            <h1>{data}</h1>
        </>
    );
};

export default Home;