import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./views/auth/login";
import BayanihanLeaderHome from "./views/bayanihan_leader/bayanihan_leader_home";
import BlSyllabus from "./views/bayanihan_leader/bl_syllabus";
import ChairPerson from "./views/dean/chairperson/chairPerson";
import ChairEdit from "./views/dean/chairperson/chairEdit"; 
import ChairCreate from "./views/dean/chairperson/chairCreate"; 
import DlCreate from "./views/dean/deadline/dlCreate";
import DeanHome from "./views/dean/home";
import DLUpdate from "./views/dean/deadline/dlEdit";
import DLList from "./views/dean/deadline/dlList";
import CreateDepartment from "./views/dean/department/departmentHome";
import EditDepartment from "./views/dean/department/deparmentEdit";
import DepartmentHome from "./views/dean/department/deparmentHome";
import SylList from "./views/dean/syllabus/sylList";
import SylView from "./views/dean/syllabus/sylView";
import Memos from "./views/dean/memo/memos";
import EditMemo from "./views/dean/memo/edit";
import MemoShow from "./views/dean/memo/show";
import Register from "./views/auth/register";
import HomePage from "./views/bayanihan_teacher/home";










function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/bayanihan-leader/home" element={<BayanihanLeaderHome />} />
        <Route path="/bayanihan-leader/syllabus" element={<BlSyllabus />} />
        <Route path="/dean/chairperson" element={<ChairPerson />} />
        <Route path="/dean/chairperson/edit" element={<ChairEdit />} />
        <Route path="/dean/chairperson/create" element={<ChairCreate />} />
        <Route path="/dean/home" element={<DeanHome />} />
        <Route path="/dean/deadline/create" element={<DlCreate />} />
        <Route path="/dean/deadline/edit" element={<DLUpdate />} />
        <Route path="/dean/deadline/list" element={<DLList />} />
        <Route path="/dean/department/create" element={<CreateDepartment />} />
        <Route path="/dean/department/edit" element={<EditDepartment />} />
        <Route path="/dean/department/home" element={<DepartmentHome />} />
        <Route path="/dean/syllabus/list" element={<SylList />} />
        <Route path="/dean/syllabus/view" element={<SylView />} />
        <Route path="/dean/memos" element={<Memos />} /> 
        <Route path="/dean/memos/edit/:id" element={<EditMemo />} />
        <Route path="/dean/memos/:id" element={<MemoShow />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bayanihan-teacher/home" element={<HomePage />} />




    
      </Routes>
    </Router>
  );
}

export default App;
