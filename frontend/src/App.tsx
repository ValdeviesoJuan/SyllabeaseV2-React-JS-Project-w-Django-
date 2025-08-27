// e.g., App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChairBTeamsPage from "./views/Chairperson/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChairBTeamsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;