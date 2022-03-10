/* css import */
import "./App.css";
/* react imports */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import DashboardContent from "./layouts/DashBoard";

/* mui imports */
import ThemeConfig from "./theme";

function App() {
  return (
    <Router>
      <ThemeConfig>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<DashboardContent />} />
        </Routes>
      </ThemeConfig>
    </Router>
  );
}

export default App;
