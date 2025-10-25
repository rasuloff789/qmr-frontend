/**
 * App.jsx - Root component of the application
 * 
 * This file defines the main routing structure of the QMR Frontend application.
 * It sets up:
 * - Dark mode provider for global theme management
 * - React Router configuration
 * - Authentication guards
 * - Public and protected routes
 * 
 * @author QMR Development Team
 * @version 1.0.0
 */

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import RequireAuth from "./components/auth/RequireAuth.jsx";
import Layout from "./components/layout/Layout.jsx";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminsPage from "./pages/Admins";
import AdminPage from "./pages/Admin";
import ComingSoonPage from "./pages/ComingSoon";
import Settings from "./pages/Settings";

/**
 * App Component
 * 
 * Main application component that sets up the routing structure.
 * Wraps the entire app with DarkModeProvider for theme management
 * and BrowserRouter for client-side routing.
 * 
 * @returns {JSX.Element} The complete application structure
 */
export default function App() {
  return (
    // DarkModeProvider wraps the entire app to provide dark mode context
    <DarkModeProvider>
      {/* BrowserRouter enables client-side routing */}
      <BrowserRouter>
        <Routes>
          {/* Public route - accessible without authentication */}
          <Route path="/login" element={<Login />} />

          {/* Protected routes - require authentication */}
          {/* RequireAuth component checks for valid JWT token before rendering */}
          <Route element={<RequireAuth />}>
            {/* Layout component provides sidebar and consistent page structure */}
            <Route element={<Layout />}>
              {/* Redirect root path to dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              {/* Main dashboard page */}
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Admin management pages */}
              <Route path="/admins" element={<AdminsPage />} />
              <Route path="/admin/:id" element={<AdminPage />} />

              {/* Placeholder routes for future development */}
              {/* These routes prevent 404 errors and show "Coming Soon" page */}
              <Route path="/students" element={<ComingSoonPage titleKey="students" />} />
              <Route path="/courses" element={<ComingSoonPage titleKey="courses" />} />
              <Route path="/teachers" element={<ComingSoonPage titleKey="teachers" />} />
              <Route path="/payments" element={<ComingSoonPage titleKey="payments" />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>

          {/* Fallback route - redirects unknown paths to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  );
}