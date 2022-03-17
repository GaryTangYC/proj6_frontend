/* css import */
import "./App.css";
/* react imports */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
/* widget/component imports */
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/Home";
import AddTaskPage from "./pages/AddTask";
import ProfilePage from "./pages/Profile";
import RequestPage from "./pages/Requests";
import ChatsPage from "./pages/Chats";
import AddPartnerPage from "./pages/AddPartner";
/* react imports */
import { AppProvider } from "./store";
/* mui imports */
import ThemeConfig from "./theme";

function App() {
  return (
    <Router>
      <ThemeConfig>
        <AppProvider>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home/:userId" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/addtask" element={<AddTaskPage />} />
            <Route path="/addpartner/:taskId" element={<AddPartnerPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/requests" element={<RequestPage />} />
            <Route path="/chats" element={<ChatsPage />} />
          </Routes>
        </AppProvider>
      </ThemeConfig>
    </Router>
  );
}

export default App;

/* 
2 routes to HomePage above 
- first route is for when first sign in, user not populated in store yet, so require userId in path
- second route is used when user alr populated in store
*/
