import {useState} from "react";
import {api_post} from "../utils/fetch";


function Register() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            'username': name,
            'password': password,
        };

        api_post('/register', data)
            .then((response) => {
                console.log(response);
                alert(response);
            })
            .catch((error) => {
                alert(error);
            });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>Register Yourself</div>
                <label>Username:</label>
                <input
                    type="text"
                    className="username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label>Password: </label>
                <input
                    type="password"
                    className="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div><input type="submit" value="Submit" /></div>
            </form>
        </>
    );
}

export default Register;