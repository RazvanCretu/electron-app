import { Routes, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Search from "./views/Search";
import Settings from "./views/Settings";
import LogIn from "./views/LogIn";
import Layout from "./components/layout";
import ProtectedLayout from "./components/ProtectedLayout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<LogIn />} />
        {/* <Route path="search" element={<Search />} /> */}
        <Route element={<ProtectedLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
