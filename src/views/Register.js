import {useState} from "react";

function Register() {
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const data = {
            username: name,
            company: company,
            password: password,
        };
        fetch("http://127.0.0.1:8000/create", {
            method: 'post',
            body: data
        })
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
                <div style={{ textAlign: "center" }}>Register Yourself</div>
                <br />
                <label>Username:</label>
                <input
                    type="text"
                    className="username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br />
                <br />
                <label>Company: </label>
                <input
                    type="text"
                    className="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
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
}

export default Register;