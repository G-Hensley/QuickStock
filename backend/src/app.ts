import express from "express";
import cors from "cors";
import itemsRoutes from "./routes/items";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/items", itemsRoutes);

export default app;
