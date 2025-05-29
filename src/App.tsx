import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import { DashboardProvider } from "./contexts/DashboardContext.tsx";
import "./App.css";
import Pemeriksaan from "./pages/Pemeriksaan/index.tsx";

function App() {
  return (
    <>
      <DashboardProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pemeriksaan" element={<Pemeriksaan />} />
          </Routes>
        </Router>
      </DashboardProvider>
    </>
  );
}

export default App;
