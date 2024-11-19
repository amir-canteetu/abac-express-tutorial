import express from "express";
import {
  getTasks,
  getTask,
  createTask,
  deleteTask,
} from "../controllers/tasksController.js";
import { enforceABAC } from "../middleware/abac.js";

const router = express.Router();

router.post("/", enforceABAC("tasks", "create"), createTask);
router.get("/", enforceABAC("tasks", "read"), getTasks);
router.get("/:id", enforceABAC("tasks", "read"), getTask);
router.delete("/:id", enforceABAC("tasks", "delete"), deleteTask);

export default router;
