/* react imports */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
      </Routes>
    </Router>
  );
}

export default App;
