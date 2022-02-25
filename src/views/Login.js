import Cookies from "js-cookie";
import {useContext, useState} from "react";
import {api_post} from "../utils/fetch";

const Login = () => {
    useContext(AuthApi);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        const news = async () => {
            return await api_post('/login', {'username': username, 'password': password})
                .then((response) => {
                    console.log(response);
                    Cookies.set("token", response.access_token);
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        let x = await news();
        if (x) {
            window.location.reload();
        }
    };
    return (
        <>
            <form
                style={{
                    marginTop: "100px",
                    marginLeft: "50px",
                    border: "solid 1px",
                    width: "max-content",
                    borderColor: "green",
                }}
                onSubmit={handleSubmit}
            >
                <div style={{ textAlign: "center" }}>Login</div>
                <br />
                <label>Username:</label>
                <input
                    type="text"
                    className="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <br />
                <label>Password: </label>
                <input
                    type="password"
                    className="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <br />
                <div style={{ textAlign: "center" }}>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </>
    );
};

export default Login;
