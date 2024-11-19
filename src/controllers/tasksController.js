import axios from "axios";
import Task from "../models/Task.js"; // Mock database or ORM model

const BASE_URL = process.env.BASE_URL || "http://localhost:3001";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const createTask = async (req, res) => {
  try {
    const newTask = await axios.post(`${BASE_URL}/tasks`, req.body);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id }    = req.params;
    const deleted   = await Task.deleteOne(id);
    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }
    res
      .status(200)
      .json({ message: "Task deleted successfully", deletedData: deleted });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting task", error: error.message });
  }
};
