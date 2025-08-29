import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./views/auth/login";
import BayanihanLeaderHome from "./views/bayanihan_leader/bayanihan_leader_home";
import BlSyllabus from "./views/bayanihan_leader/bl_syllabus";
import BLTOSPage from "./views/bayanihan_leader/bl_tos";
import BLMemoPage from "./views/bayanihan_leader/bl_memo";
import RolePage from "./views/auth/role";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/bayanihan-leader/home" element={<BayanihanLeaderHome />} />
        <Route path="/bayanihan-leader/syllabus" element={<BlSyllabus />} /> {/* ✅ syllabus route */}
        <Route path="/tos" element={<BLTOSPage />} />
        <Route path="/memo" element={<BLMemoPage />} />
        <Route path="/role" element={<RolePage />} />
      </Routes>
    </Router>
  );
}

export default App;
