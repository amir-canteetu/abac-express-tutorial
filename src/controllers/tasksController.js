import Task from "../models/Task.js"; // ORM model
import { hasPermission } from "../utils/permissions.js";

export const getTasks = async (req, res) => {
  try {
    const user = req.user;
    if (!user || !hasPermission(user, "tasks", "read")) {
      return res.status(403).json({ error: "Access denied" });
    }
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch tasks", details: err.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    const user = req.user;
    if (!user || !hasPermission(user, "tasks", "read", task)) {
      return res.status(403).json({ error: "Access denied" });
    }
    res.json(task);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch tasks", details: err.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const user = req.user;
    if (!user || !hasPermission(user, "tasks", "create")) {
      return res.status(403).json({ error: "Access denied" });
    }
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create task", details: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const user = req.user;
    if (!user || !hasPermission(user, "tasks", "delete", task)) {
      return res.status(403).json({ error: "Access denied" });
    }
    const deleted = await Task.deleteOne(id);
    res
      .status(200)
      .json({ message: "Task deleted successfully", deletedData: deleted });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting task", error: error.message });
  }
};
