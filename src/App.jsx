// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AdminsPage from "./pages/AdminsPage";
import AdminPage from "./pages/AdminPage";
import ComingSoonPage from "./pages/ComingSoonPage.jsx";

export default function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* barcha himoyalangan ruta uchun wrapper */}
          <Route element={<RequireAuth />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Home />} />
              <Route path="/admins" element={<AdminsPage />} />
              <Route path="/admin/:id" element={<AdminPage />} />
              {/* Placeholder routes to prevent login redirect */}
              <Route path="/students" element={<ComingSoonPage titleKey="students" />} />
              <Route path="/courses" element={<ComingSoonPage titleKey="courses" />} />
              <Route path="/teachers" element={<ComingSoonPage titleKey="teachers" />} />
              <Route path="/payments" element={<ComingSoonPage titleKey="payments" />} />
              <Route path="/settings" element={<ComingSoonPage titleKey="settings" />} />
            </Route>
          </Route>

          {/* fallback - redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  );
}