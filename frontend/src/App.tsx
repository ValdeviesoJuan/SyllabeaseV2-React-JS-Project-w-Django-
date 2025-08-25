import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./views/auth/login";
import BayanihanLeaderHome from "./views/bayanihan_leader/bayanihan_leader_home";
import BlSyllabus from "./views/bayanihan_leader/bl_syllabus";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/bayanihan-leader/home" element={<BayanihanLeaderHome />} />
        <Route path="/bayanihan-leader/syllabus" element={<BlSyllabus />} /> {/* ✅ new route */} 
      </Routes>
    </Router>
  );
}

export default App;