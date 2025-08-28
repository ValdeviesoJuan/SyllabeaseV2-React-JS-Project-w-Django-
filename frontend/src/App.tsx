// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Chairperson Views
import Home from "./views/Chairperson/Home";
import ProgramOutcome from "./views/Chairperson/ProgramOutcome/poList";
import Curricula from "./views/Chairperson/curricula/currList";
import Syllabus from "./views/Chairperson/Syllabus/syllList";
import SyllView from "./views/Chairperson/Syllabus/syllView";
import Memo from "./views/Chairperson/memo/chairMemo";
import Reports from "./views/Chairperson/Reports/reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chairperson/home" element={<Home />} />
        <Route path="/chairperson/program-outcomes" element={<ProgramOutcome />} />
        <Route path="/chairperson/curricula" element={<Curricula />} />
        <Route path="/chairperson/syllabus" element={<Syllabus />} />
        <Route path="/chairperson/syllabus/:id" element={<SyllView />} />
        <Route path="/chairperson/memo" element={<Memo />} />
        <Route path="/chairperson/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
