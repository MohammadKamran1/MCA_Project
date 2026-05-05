import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";       // 👈 Landing Page
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

// Protected Route
function PrivateRoute({ children }) {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* 👇 Landing Page */}
          <Route path="/" element={<Home />} />

          {/* 👇 Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 👇 Protected */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<h1>Page Not Found</h1>} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}