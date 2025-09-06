import { BrowserRouter, Routes, Route } from "react-router-dom";

// ================= Chairperson Views =================
import Home from "./views/Chairperson/Home";
import ProgramOutcome from "./views/Chairperson/ProgramOutcome/poList";
import EducObjective from "./views/Chairperson/POE/poeList";
import Curricula from "./views/Chairperson/curricula/currList";
import Syllabus from "./views/Chairperson/Syllabus/syllList";
import SyllView from "./views/Chairperson/Syllabus/syllView";
import Memo from "./views/Chairperson/memo/chairMemo";
import Reports from "./views/Chairperson/Reports/reports";
import TOS from "./views/Chairperson/Tos/tosList";
import ShowChairMemo from "./views/Chairperson/memo/showChairMemo";
import TosView from "./views/Chairperson/Tos/tosView";
import CurrEdit from "./views/Chairperson/curricula/currEdit";
import PoCreate from "./views/Chairperson/ProgramOutcome/poCreate";
import PoEdit from "./views/Chairperson/ProgramOutcome/poEdit";
import PoeEdit from "./views/Chairperson/POE/poeEdit";
import PoeCreate from "./views/Chairperson/POE/poeCreate";

// ================= Auth Views =================
import LoginPage from "./views/auth/login";
import Register from "./views/auth/register";

// ================= Bayanihan Leader Views =================
import BayanihanLeaderHome from "./views/bayanihan_leader/bayanihan_leader_home";
import BlSyllabus from "./views/bayanihan_leader/bl_syllabus";

// ================= Dean Views =================
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

// ================= Teacher Views =================
import HomePage from "./views/bayanihan_teacher/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

        {/* Chairperson */}
        <Route path="/chairperson/home" element={<Home />} />
        <Route path="/chairperson/program-outcomes" element={<ProgramOutcome />} />
        <Route path="/chairperson/poe" element={<EducObjective />} />
        <Route path="/chairperson/curricula" element={<Curricula />} />
        <Route path="/chairperson/syllabus" element={<Syllabus />} />
        <Route path="/chairperson/tos" element={<TOS />} />
        <Route path="/chairperson/syllabus/:id" element={<SyllView />} />
        <Route path="/chairperson/memo" element={<Memo />} />
        <Route path="/chairperson/reports" element={<Reports />} />
        <Route path="/chairperson/memo/:id" element={<ShowChairMemo />} />
        <Route path="/chairperson/tos/view/:tosId" element={<TosView />} />
        <Route path="/chairperson/curricula/edit/:id" element={<CurrEdit />} />
        <Route path="/chairperson/program-outcome/create" element={<PoCreate />} />
        <Route path="/chairperson/program-outcome/edit" element={<PoEdit />} />
        <Route path="/chairperson/poe/edit" element={<PoeEdit />} />
        <Route path="/chairperson/poe/create" element={<PoeCreate />} />

        {/* Bayanihan Leader */}
        <Route path="/bayanihan-leader/home" element={<BayanihanLeaderHome />} />
        <Route path="/bayanihan-leader/syllabus" element={<BlSyllabus />} />

        {/* Dean */}
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

        {/* Teacher */}
        <Route path="/bayanihan-teacher/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
