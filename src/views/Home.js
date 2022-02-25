import {useContext, useEffect, useState} from "react";
import Cookies from "js-cookie";
import authContext from "../utils/authContext";

const Home = () => {
    let [data, setData] = useState("");
    const Auth = useContext(authContext);

    const handleClick = () => {
        Auth.setAuth(false);
        Cookies.remove("token");
    };

    let token = Auth.token;


    useEffect(() => {
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        let x = fetch("http://127.0.0.1:8000/", {headers})
            .then(async (response) => {
                const data = await response.json();
                console.log(data)
                setData(data.data);
            })
            .catch(error => {
                console.log(error);
            });
        console.log(x);
    }, [token]);
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