import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeDashboard from "./components/EmployeeDashboard";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeNotFound from "./components/EmployeeNotFound";
import Navbar from "./components/Navbar";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<EmployeeDashboard />} />
          <Route path="/form" element={<EmployeeForm />} />
          <Route path="/form/:id" element={<EmployeeForm />} />
          <Route path="*" element={<EmployeeNotFound />} />
        </Routes>
    </Router>
  );
}

export default App;
