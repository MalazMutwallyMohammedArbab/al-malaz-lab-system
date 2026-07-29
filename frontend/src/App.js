import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddPatient from "./Pages/AddPatient";
import PatientsList from "./Pages/PatientsList";
import ResultsPage from './Pages/ResultsPage';
import ResultsListPage from './Pages/ResultsListPage';
import ResultViewPage from "./Pages/ResultViewPage";
import LoginPage from './Pages/LoginPage';
import MainLayout from './Layouts/MainLayout';
import ProtectedRoute from './Components/ProtectedRoute';


function App() {
  return (
  <Router>
    <Routes>

    <Route path="/login" element={<LoginPage />} />

    <Route
      element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/" element={<AddPatient />} />
      <Route path="/patients" element={<PatientsList />} />
      <Route path="/results/:id" element={<ResultsPage />} />
      <Route path="/results" element={<ResultsListPage />} />
      <Route path="/result/:id" element={<ResultViewPage />} />
    </Route>

    </Routes>
  </Router>
  );
}

export default App;