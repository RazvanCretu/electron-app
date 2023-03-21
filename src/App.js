import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Search from "./screens/Search";
import Settings from "./screens/Settings";
import LogIn from "./screens/LogIn";
import Layout from "./components/Layout";
import ProtectedLayout from "./components/ProtectedLayout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="login" element={<LogIn />} />
        <Route element={<ProtectedLayout />}>
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
