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

      </Routes>
    </Router>
  );
}

export default App;
