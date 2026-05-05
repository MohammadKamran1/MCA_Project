const express = require("express");
const Todo = require("../models/Todo");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// GET TODOS
router.get("/", auth, async (req, res) => {
  const todos = await Todo.find({ user: req.user });
  res.json(todos);
});

// ADD TODO
router.post("/", auth, async (req, res) => {
  const todo = await Todo.create({
    user: req.user,
    text: req.body.text
  });
  res.json(todo);
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

// TOGGLE
router.put("/:id", auth, async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
});

module.exports = router;