/* css import */
import "./App.css";
/* react imports */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn";
/* mui imports */
import ThemeConfig from "./theme";

function App() {
  return (
    <Router>
      <ThemeConfig>
        <Routes>
          <Route path="/" element={<LogIn />} />
        </Routes>
      </ThemeConfig>
    </Router>
  );
}

export default App;
