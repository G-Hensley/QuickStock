import { useState, useEffect } from "react";
import { Item } from "../../../backend/src/models/itemsModel";

const Table: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/items'); // Adjust the URL to your backend endpoint
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data: Item[] = await response.json();
                setItems(data);
            } catch (error: any) {
                setError(error.message || 'Something went wrong');
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (items.length === 0) {
        return <div>Loading...</div>;
    }

    const onDelete = async (id: number) => {

        try {
            const response = await fetch(`http://localhost:5000/api/items/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                console.log('Item deleted successfully');
                setItems((prevItems) => prevItems.filter((item) => item.id !== id));
            } else {
                console.error('Failed to delete item');
            }
        } catch (error) {
            console.error('Error deleting item: ', error);
        }

    }

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>${item.price}</td>
                        <td>
                            <button onClick={() => {onDelete(item.id)}}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;