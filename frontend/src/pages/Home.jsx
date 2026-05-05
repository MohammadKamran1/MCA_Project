import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const nav = useNavigate();
  const { token } = useContext(AuthContext);

  return (
    <>
      <Header />

      <div className="hero">
        <div className="hero-text">
          <h1>Simplify Your Task Management</h1>
          <p>Organize and track your tasks the easy way.</p>

          {/* ✅ DYNAMIC BUTTON */}
          {token ? (
            <button className="btn" onClick={() => nav("/dashboard")}>
              Go to Todos
            </button>
          ) : (
            <button className="btn" onClick={() => nav("/login")}>
              Get Started
            </button>
          )}
        </div>

        <img src="https://cdn-icons-png.flaticon.com/512/9068/9068753.png" />
      </div>
    </>
  );
}