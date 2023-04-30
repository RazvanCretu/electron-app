import { Routes, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Profile from "./views/Profile";
import Settings from "./views/Settings";
import LogIn from "./views/LogIn";
import Layout from "./components/layout";
import ProtectedLayout from "./components/ProtectedLayout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<LogIn />} />
        <Route element={<ProtectedLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />}>
            <Route index element={<p>Me</p>} />
            <Route path="edit" element={<p>Edit</p>} />
          </Route>
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
