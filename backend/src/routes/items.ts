import { Router } from "express";
import { getItems, getItemById, addNewItem, updateItem } from "../controllers/itemsController";

const router = Router();

// Define routes
router.get("/", getItems);             // GET all items
router.get("/:id", getItemById);       // GET a single item by ID
router.post("/", addNewItem);
router.put("/:id", updateItem);

export default router;
