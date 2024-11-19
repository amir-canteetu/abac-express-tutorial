import axios from "axios";

const BASE_URL = process.env.BASE_URL || "http://localhost:3001";

const Task = {
  // Fetch all tasks from the server
  findAll: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tasks`);
      return response.status === 200 ? response.data : null;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },

  // Fetch a task by ID
  findById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/tasks/${id}`);
      return response.status === 200 ? response.data : null;
    } catch (error) {
      console.error(`Error fetching task with ID ${id}:`, error);
      throw error;
    }
  },

  // Create a new task
  create: async (newTask) => {
    try {
      const response = await axios.post(`${BASE_URL}/tasks`, newTask);
      return response.status === 200 ? response.data : null;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  },

  // Delete a task by ID
  deleteOne: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/tasks/${id}`);
      return response.status === 200 ? response.data : null;
    } catch (error) {
      console.error(`Error deleting task with ID ${id}:`, error);
      throw error;
    }
  },

  // Update a task by ID
  update: async (id, updatedFields) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/tasks/${id}`,
        updatedFields
      );
      return response.status === 200 ? response.data : null;
    } catch (error) {
      console.error(`Error updating task with ID ${id}:`, error);
      throw error;
    }
  },
};

export default Task;
