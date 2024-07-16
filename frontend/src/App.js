import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./pages/home/index";
import Main from "./pages/main/main";

function App() {
  return (
    <Routes>
      <Route path="*" element={<Main />} />
      <Route path="/" element={<Main />} />
      <Route path="/Home" element={<Home />} />
    </Routes>
  );
}

export default App;
