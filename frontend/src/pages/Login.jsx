import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api";
import Header from "../components/Header";   // ✅ correct place

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({});
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        const res = await fetch(API + "/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });

        const data = await res.json();

        if (data.token) {
          login(data.token);
          nav("/dashboard");
        } else {
          alert(data.message || "Login Failed");
        }

      } else {
        const res = await fetch(API + "/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });

        if (res.ok) {
          alert("Registered Successfully");
          setIsLogin(true);
        }
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <Header />

      <div className="container">
        <div className="card">
          <h2>{isLogin ? "Login" : "Register"}</h2>

          {!isLogin && (
            <input
              placeholder="Name"
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          )}

          <input
            placeholder="Email"
            onChange={e => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />

          <button className="btn" onClick={handleSubmit}>
            {isLogin ? "Login" : "Register"}
          </button>

          <div className="toggle">
            {isLogin ? "No account?" : "Already have account?"}
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? " Register" : " Login"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}