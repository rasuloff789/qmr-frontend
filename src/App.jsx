// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Login from "./pages/Login";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* barcha himoyalangan ruta uchun wrapper */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          {/* boshqa himoyalangan route lar */}
        </Route>

        {/* fallback */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
