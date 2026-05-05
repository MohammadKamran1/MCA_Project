import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const nav = useNavigate();
  const { token, logout } = useContext(AuthContext);

  return (
    <div className="header">
      
      {/* ✅ CLICKABLE LOGO */}
      <div className="logo" onClick={() => nav("/")} style={{ cursor: "pointer" }}>
        <div className="logo-box"></div>
        <div>
          <h2>ToDoEase</h2>
          <div className="subtitle">
            A Simple Task Management System
          </div>
        </div>
      </div>

      {/* ✅ RIGHT SIDE BUTTON */}
      {token ? (
        <button
        className="btn"
        onClick={() => {
            logout();     // remove token
            nav("/");     // go to homepage ✅
        }}
        >
        Logout
        </button>
      ) : (
        <button className="btn" onClick={() => nav("/login")}>
          Login
        </button>
      )}

    </div>
  );
}