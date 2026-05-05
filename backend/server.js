const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

// DB
mongoose.connect("mongodb://127.0.0.1:27017/todoease");

// MODELS
const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String
});

const Todo = mongoose.model("Todo", {
  user: String,
  text: String,
  completed: Boolean,
  createdAt: { type: Date, default: Date.now }
});

// AUTH MIDDLEWARE
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.send("No token");

  const decoded = jwt.verify(token, "secret");
  req.user = decoded.id;
  next();
};

// REGISTER
app.post("/register", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({ ...req.body, password: hashed });
  res.json(user);
});

// LOGIN
app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const ok = await bcrypt.compare(req.body.password, user.password);

  if (!ok) return res.send("Wrong");

  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token });
});

// TODOS
app.get("/todos", auth, async (req, res) => {
  const todos = await Todo.find({ user: req.user });
  res.json(todos);
});

app.post("/todos", auth, async (req, res) => {
  const todo = await Todo.create({
    user: req.user,
    text: req.body.text,
    completed: false
  });
  res.json(todo);
});

app.put("/todos/:id", auth, async (req, res) => {
  const t = await Todo.findById(req.params.id);
  t.completed = !t.completed;
  await t.save();
  res.json(t);
});

app.delete("/todos/:id", auth, async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

app.listen(5000, () => console.log("Server running"));