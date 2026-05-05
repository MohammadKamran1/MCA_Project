import { useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";

export default function TodoForm({ refresh }) {
  const [text, setText] = useState("");
  const { token } = useContext(AuthContext);

  const addTodo = async () => {
    if (!text) return;

    await fetch(API + "/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ text })
    });

    setText("");
    refresh();
  };

  return (
    <div>
      <input value={text} onChange={e=>setText(e.target.value)} />
      <button onClick={addTodo}>Add</button>
    </div>
  );
}