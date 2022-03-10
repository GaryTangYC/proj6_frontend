/* css import */
import "./App.css";
/* react imports */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/Home";
import AddTaskPage from "./pages/AddTask";

/* mui imports */
import ThemeConfig from "./theme";

function App() {
  return (
    <Router>
      <ThemeConfig>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/test" element={<LogInTest/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/addtask" element={<AddTaskPage />} />
        </Routes>
      </ThemeConfig>
    </Router>
  );
}

export default App;
