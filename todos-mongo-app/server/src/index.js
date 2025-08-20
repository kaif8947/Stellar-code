import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import todoRoutes from "./routes/todos.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(cors()); 

app.use("/todos", todoRoutes);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(" Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error(" MongoDB connection error:", error));
