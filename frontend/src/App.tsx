// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Chairperson Views
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
