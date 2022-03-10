/* css import */
import "./App.css";
/* react imports */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/Home";
import AddTaskPage from "./pages/AddTask";
import ProfilePage from "./pages/Profile";
import RequestPage from "./pages/Requests";
import ChatsPage from "./pages/Chats";

/* mui imports */
import ThemeConfig from "./theme";

function App() {
  return (
    <Router>
      <ThemeConfig>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/addtask" element={<AddTaskPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/requests" element={<RequestPage />} />
          <Route path="/chats" element={<ChatsPage />} />
        </Routes>
      </ThemeConfig>
    </Router>
  );
}

export default App;
