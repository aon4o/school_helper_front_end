import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import authContext from "./utils/authContext";

import Base from "./components/layout/Base";
import Home from './views/Home';
import Instructions from "./views/Instructions";
import DiscordBot from "./views/DiscordBot";
import NoPage from "./views/NoPage";

import Login from './views/Login';
import Register from "./views/Register";

import Classes from "./views/Classes/Classes";
import ClassCreate from "./views/Classes/ClassCreate";
import ClassEdit from "./views/Classes/ClassEdit";
import Class from "./views/Classes/Class";
import ClassSubjects from "./views/Classes/ClassSubjects";

import Subject from "./views/Subjects/Subject";
import Subjects from "./views/Subjects/Subjects";
import SubjectCreate from "./views/Subjects/SubjectCreate";
import SubjectEdit from "./views/Subjects/SubjectEdit";

import Users from "./views/Users/Users";
import Me from "./views/Users/Me";
import MeEdit from "./views/Users/MeEdit";
import User from "./views/Users/User";
import getUserScope from "./utils/getUserScope";

const App = () => {
    const [auth, setAuth] = useState(false);
    const [token, setToken] = useState("");
    const [scope, setScope] = useState(undefined);

    useEffect(() => {
        let token = Cookies.get("token");
        if (token) {
            setAuth(true);
            setToken(token);
            getUserScope(token).then(scope => {setScope(scope)});
        }
    }, []);

    return (
        <authContext.Provider value={{ auth, setAuth, token, setToken, scope, setScope }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Base />}>
                        <Route index element={<Home />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
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
                        <Route path="users">
                            <Route index element={<Users />}/>
                            <Route path="me" element={<Me />} />
                            <Route path="me/edit" element={<MeEdit />} />
                            <Route path=":email" element={<User />}/>
                        </Route>
                        <Route path="/discord" element={<DiscordBot />} />
                        <Route path="/instructions" element={<Instructions />} />
                        <Route path="*" element={<NoPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </authContext.Provider>
    );
};

export default App;
