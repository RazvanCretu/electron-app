// import { Router, Route } from "electron-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Layout from "./components/Layout";
import Search from "./screens/Search";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Route>
    </Routes>
  );
}

export default App;
