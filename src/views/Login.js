import Cookies from "js-cookie";
import {useState} from "react";
import {api_post} from "../utils/fetch";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();

        api_post('/login', {'username': username, 'password': password})
            .then((response) => {
                console.log(response);
                Cookies.set("token", response.access_token);
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>Login</div>
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
                <div><input type="submit" value="Submit" /></div>
            </form>
        </>
    );
};

export default Login;