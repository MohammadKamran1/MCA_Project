import { useEffect, useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";

export default function Dashboard() {
  const { token, logout } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // FETCH TODOS
  const fetchTodos = async () => {
    const res = await fetch(API + "/todos", {
      headers: { Authorization: token }
    });
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    if (token) fetchTodos();
  }, [token]);

  // ADD TASK
  const addTask = async () => {
    if (!text.trim()) return;

    await fetch(API + "/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ text })
    });

    setText("");
    fetchTodos();
  };

  // TOGGLE TASK (checkbox)
  const toggleTask = async (id, currentStatus) => {
    await fetch(API + "/todos/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ completed: !currentStatus })
    });

    fetchTodos();
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    await fetch(API + "/todos/" + id, {
      method: "DELETE",
      headers: { Authorization: token }
    });

    fetchTodos();
  };

  // EDIT TASK (only text change)
  const editTask = async (todo) => {
    const newText = prompt("Edit task", todo.text);
    if (!newText) return;

    await fetch(API + "/todos/" + todo._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        text: newText,
        completed: todo.completed   // 🔥 important
      })
    });

    fetchTodos();
  };

  return (
    <>
      <Header onLogout={logout} />

      <div className="dashboard">
        <h3>Welcome, User!</h3>
        <h1>Your Tasks</h1>

        <div className="task-input">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="New Task"
          />
          <button className="btn" onClick={addTask}>
            Add Task
          </button>
        </div>

        {todos.map((t) => (
          <div className="todo-box" key={t._id}>

            {/* LEFT SIDE */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              
              {/* ✅ CHECKBOX */}
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleTask(t._id, t.completed)}
              />

              <div>
  <span style={{
    textDecoration: t.completed ? "line-through" : "none",
    fontWeight: "500"
  }}>
    {t.text}
  </span>

  {/* ✅ DATE + STATUS */}
  <div style={{ fontSize: "12px", color: "gray", marginTop: "4px" }}>
    Status: {t.completed ? "Completed" : "Pending"} <br />

    Created:{" "}
    {t.createdAt
      ? new Date(t.createdAt).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short"
        })
      : "N/A"}
  </div>
</div>
            </div>

            {/* RIGHT SIDE */}
            <div className="todo-actions">
              <button onClick={() => editTask(t)}>Edit</button>
              <button onClick={() => deleteTask(t._id)}>Delete</button>
            </div>

          </div>
        ))}
      </div>
    </>
  );
}