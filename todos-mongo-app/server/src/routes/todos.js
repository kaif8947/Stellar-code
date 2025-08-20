import { Router } from "express";
import mongoose from "mongoose";
import Todo from "../models/Todo.js";

const router = Router();

router.get("/", async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
});


router.post("/", async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title required" });
  const todo = await Todo.create({ title });
  res.status(201).json(todo);
});


router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ error: "Invalid ID" });

  const deleted = await Todo.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: "Not found" });

  res.status(204).send();
});

export default router;
