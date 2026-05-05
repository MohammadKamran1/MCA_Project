import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import Header from "../components/Header";   // ✅ correct place

export default function Register() {
  const [form, setForm] = useState({});
  const nav = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await fetch(API + "/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        alert("Registered Successfully");
        nav("/login");
      } else {
        alert("Registration Failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server Error");
    }
  };

  return (
    <>
      <Header />

      <div className="container">
        <div className="card">
          <h2>Register</h2>

          <input
            placeholder="Name"
            onChange={e => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Email"
            onChange={e => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />

          <button className="btn" onClick={handleRegister}>
            Register
          </button>
        </div>
      </div>
    </>
  );
}