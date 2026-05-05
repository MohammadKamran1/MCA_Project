import { useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";

export default function TodoItem({ todo, refresh }) {
  const { token } = useContext(AuthContext);

  const toggle = async () => {
    await fetch(API + "/todos/" + todo._id, {
      method: "PUT",
      headers: { Authorization: token }
    });
    refresh();
  };

  const del = async () => {
    await fetch(API + "/todos/" + todo._id, {
      method: "DELETE",
      headers: { Authorization: token }
    });
    refresh();
  };

  return (
    <div>
      <span onClick={toggle}>
        {todo.completed ? "✔" : "❌"} {todo.text}
      </span>
      <button onClick={del}>Delete</button>
      <small>{new Date(todo.createdAt).toLocaleString()}</small>
    </div>
  );
}