import {BrowserRouter, Routes, Route} from "react-router-dom";

import Home from './views/Home';
import Login from './views/Login';
import NoPage from "./views/NoPage";
import Base from "./components/layout/Base";
import Register from "./views/Register";
import Test from "./views/Test";
import Classes from "./views/Classes/Classes";
import ClassCreate from "./views/Classes/ClassCreate";
import ClassEdit from "./views/Classes/ClassEdit";
import Class from "./views/Classes/Class";
import Subject from "./views/Subjects/Subject";
import Subjects from "./views/Subjects/Subjects";
import SubjectCreate from "./views/Subjects/SubjectCreate";
import SubjectEdit from "./views/Subjects/SubjectEdit";
import ClassSubjects from "./views/Classes/ClassSubjects";

const App = () => {
    return (
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

                    <Route path="test" element={<Test />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
