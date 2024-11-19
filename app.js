import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import taskRoutes from "./src/routes/task.js";

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3001";

dotenv.config();
const app = express();

app.use(cors({ origin: CLIENT_URL }));
app.use(morgan("combined"));
app.use(express.json());

// Mock user injection middleware
app.use((req, res, next) => {
  req.user = { id: 2, name: "Bob", roles: ["user"], department: "Finance" }; // Example user
  console.log("res:", res.data);
  next();
});

// Routes
app.use("/api/tasks", taskRoutes);

export default app;
