import { useState, useEffect } from "react";
import { Item } from "../../../backend/src/models/itemsModel";

export default function Table() {

    const [inventory, setInventory] = useState<Item[]>([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const response = await fetch("/api/items");
        const data = await response.json();
        setInventory(data);
    }

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`/api/items/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log(`Item with id ${id} deleted successfully`);
            } else {
                console.error(`Falied to delete item with id ${id}`);
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    }

    <>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {inventory.map((item) => (
                    <tr key={item.id} >
                        <td>{item.id}</td>
                        <td>item.name</td>
                        <td>item.quantity</td>
                        <td>${item.price}</td>
                        <td>
                            <button>Edit</button>
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
}