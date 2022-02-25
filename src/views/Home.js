import {useContext, useEffect, useState} from "react";
import Cookies from "js-cookie";

const Home = (props) => {
    const [data, setData] = useState("");
    const Auth = useContext(props.auth);
    const Token = useContext(props.token);

    const handleClick = () => {
        Auth.setAuth(false);
        Cookies.remove("token");
    };

    let toke = Token.token;
    const headers = {
        Authorization: `Bearer ${toke}`,
    };

    const getData = async () => {
        return await fetch("http://127.0.0.1:8000/", {headers})
            .then((response) => {
                return response.data.data;
            });
    };
    useEffect(async () => {
        let x = await getData();
        setData(x);
        console.log(x);
    }, [getData]);
    return (
        <>
            <h2>Home</h2>
            <button onClick={handleClick}>Logout</button>
            <h1>{data}</h1>
        </>
    );
};

export default Home;