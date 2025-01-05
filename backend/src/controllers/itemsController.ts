import { Request, Response } from "express";
import { readAll, readOne, addItem, updateItems, deleteItem } from "../models/itemsModel";

export const getItems = async (req: Request, res: Response) => {
    try {
        const items = await readAll();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch items" });
    }
};

export const getItemById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const item = await readOne(id);
        if (item) {
            res.status(200).json(item);
        } else {
            res.status(404).json({ message: "Item not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch item" });
    }
};

export const addNewItem = async (req: Request, res: Response): Promise<void> => {
    try {
        // Validate request body
        const { name, quantity, price } = req.body;
        console.log(name);


        if (!name || !quantity || !price) {
            res.status(400).json({ error: "Missing required fields: name, quantity, and price." });
            return;
        }

        if (typeof name !== "string" || typeof quantity !== "number" || typeof price !== "number") {
            res.status(400).json({ error: "Invalid data types. Name must be a string, quantity and price must be numbers." });
            return;
        }

        if (quantity < 0 || price < 0) {
            res.status(400).json({ error: "Quantity and price must be positive values." });
            return;
        }

        // Add item to database
        const addedItem = await addItem([name, quantity, price]);
        res.status(200).json(addedItem);

    } catch (error) {
        console.error("Error adding item:", error);
        res.status(500).json({ error: "Failed to add item. Please try again later." });
    }
};

export const updateItem = async (req: Request, res: Response): Promise<void> => {
    try {
        // Extract id from request parameters
        const id = parseInt(req.params.id);

        // Validate id
        if (isNaN(id)) {
            res.status(400).json({ error: "Invalid ID provided. Must be a number." });
            return;
        }

        // Extract fields from request body
        const { name, quantity, price } = req.body;

        // Validate at least one field is provided
        if (!name && !quantity && !price) {
            res.status(400).json({ error: "No fields provided for update." });
            return;
        }

        // Validate field types
        if (name !== undefined && typeof name !== "string") {
            res.status(400).json({ error: "'name' must be a string." });
            return;
        }
        if (quantity !== undefined && (typeof quantity !== "number" || quantity < 0)) {
            res.status(400).json({ error: "'quantity' must be a non-negative number." });
            return;
        }
        if (price !== undefined && (typeof price !== "number" || price < 0)) {
            res.status(400).json({ error: "'price' must be a non-negative number." });
            return;
        }

        // Prepare the updated fields
        const updatedItem = {
            id,
            name,
            quantity,
            price,
        };

        // Update the item in the database
        const result = await updateItems(updatedItem);

        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: "Item not found." });
        }
    } catch (error) {
        console.error("Error updating item:", error);
        res.status(500).json({ error: "Failed to update item." });
    }
};

export const deleteOne = async (req: Request, res: Response) => {

    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ error: "Invalid ID Provided." });
            return;
        }

        const deleted = await deleteItem(id);
        
        if (deleted) {
            res.status(204).send();
            return;
        } else {
            res.status(404).json({ error: "Item doesn't exist." });
            return;
        }

    } catch (error) {
        console.error("Error deleting item: ", error);
        res.status(500).json({ error: "Failed to delete item." });
    }

}