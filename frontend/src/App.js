import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import AddPatient from "./Pages/AddPatient";
import PatientsList from "./Pages/PatientsList";
import ResultsPage from './Pages/ResultsPage';
import ResultsListPage from './Pages/ResultsListPage';
import ResultViewPage from "./Pages/ResultViewPage";


function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<AddPatient />} />
        <Route path="/patients" element={<PatientsList />} />
        <Route path="/results/:id" element={<ResultsPage />} />
        <Route path="/results" element={<ResultsListPage />} />
        <Route path="/result/:id" element={<ResultViewPage />} />
      </Routes>
    </Router>
  );
}

export default App;