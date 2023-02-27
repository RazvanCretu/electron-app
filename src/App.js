// import { Router, Route } from "electron-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./Screens/Home";
import Layout from "./components/Layout";

function App() {
  return (
    // Wraper implementation
    // <Router
    // main={
    //   <Route element={<Layout />}>
    //     <Route index element={<Home />} />
    //     <Route path="/search" element={<div id="searchScreen"></div>} />
    //   </Route>
    // }
    // />
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/search" element={<div id="searchScreen"></div>} />
      </Route>
    </Routes>
  );
}

export default App;
