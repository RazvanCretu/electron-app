// import { Router, Route } from "electron-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Layout from "./components/Layout";
import Search from "./screens/Search";
import ProtectedLayout from "./components/ProtectedLayout";
import Settings from "./screens/Settings";
import LogIn from "./screens/LogIn";
import Succes from "./screens/Succes";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="login" element={<LogIn />} />
        <Route path="/succes" element={<Succes />} />
        <Route element={<ProtectedLayout />}>
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
