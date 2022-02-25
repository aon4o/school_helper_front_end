import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import {createContext, useContext, useEffect, useState} from "react";
import Cookies from "js-cookie";

// import Home from './views/Home';
// import Login from './views/Login';
// import Register from "./views/Register";
import NoPage from "./views/NoPage";
import Base from "./components/layout/Base";
import Classes from "./views/Classes/Classes";
import ClassCreate from "./views/Classes/ClassCreate";
import ClassEdit from "./views/Classes/ClassEdit";
import Class from "./views/Classes/Class";
import Subject from "./views/Subjects/Subject";
import Subjects from "./views/Subjects/Subjects";
import SubjectCreate from "./views/Subjects/SubjectCreate";
import SubjectEdit from "./views/Subjects/SubjectEdit";
import ClassSubjects from "./views/Classes/ClassSubjects";
import {api_post} from "./utils/fetch";

const AuthApi = createContext(undefined);
const TokenApi = createContext(undefined);




const App = () => {

    const Auth = useContext(AuthApi);

    const [auth, setAuth] = useState(false);
    const [token, setToken] = useState("");

    const readCookie = () => {
        let token = Cookies.get("token");
        if (token) {
            setAuth(true);
            setToken(token);
        }
    };

    useEffect(() => {
        readCookie();
    }, []);

    return (
        <AuthApi.Provider value={{ auth, setAuth }}>
            <TokenApi.Provider value={{ token, setToken }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Base />}>
                            {/*<Route index element={<Home />} />*/}
                            {/*<Route path="login" element={<Login />} />*/}
                            {/*<Route path="register" element={<Register />} />*/}
                            <Route path="classes">
                                <Route index element={<Classes />}/>
                                <Route path="create" element={<ClassCreate />} />
                                <Route path=":name" element={<Class />}/>
                                <Route path=":name/edit" element={<ClassEdit/>} />
                                <Route path=":name/subjects" element={<ClassSubjects/>} />
                            </Route>
                            <Route path="subjects">
                                <Route index element={<Subjects />}/>
                                <Route path="create" element={<SubjectCreate />} />
                                <Route path=":name" element={<Subject />}/>
                                <Route path=":name/edit" element={<SubjectEdit/>} />
                            </Route>

                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/" element={<Home />} />

                            <Route path="*" element={<NoPage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </TokenApi.Provider>
        </AuthApi.Provider>
    );
}

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

function Register() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (evt) => {
        evt.preventDefault();
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

const Home = () => {
    let [data, setData] = useState("");
    const Auth = useContext(AuthApi);
    const Token = useContext(TokenApi);

    const handleClick = () => {
        Auth.setAuth(false);
        Cookies.remove("token");
    };

    let token = Token.token;
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const getData = async () => {
        return await fetch("http://127.0.0.1:8000/", {headers})
            .then(async (response) => {
                const data = await response.json();
                console.log(data)
                return data.data;
            })
            .catch(error => {
                console.log(error);
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
            {Auth ?
                <button onClick={handleClick}>Logout</button>
            :
                <span>asd</span>
            }
            <h1>{data}</h1>
        </>
    );
};
export default App;
