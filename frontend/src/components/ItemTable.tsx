import { useState, useEffect } from "react";
import { Item, updateItems } from "../../../backend/src/models/itemsModel";
import EditModal from "./EditModal";
import  { AddItem }  from "./AddItem";
import '../styles/ItemTable.css';

const Table: React.FC = () => {
    const apiEndpoint: string = 'http://localhost:5000/api/items/';

    const [items, setItems] = useState<Item[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState<Item | null>(null);
    
    const addItemToTable = (newItem: Item) => {
        setItems((prevItems) => [...prevItems, newItem]);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiEndpoint);
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

    const onDelete = async (id: number) => {
        try {
            const response = await fetch(`${apiEndpoint}${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setItems((prevItems) => prevItems.filter((item) => item.id !== id));
            } else {
                console.error('Failed to delete item');
            }
        } catch (error) {
            console.error('Error deleting item: ', error);
        }
    };

    const handleEditClick = (item: Item) => {
        setCurrentItem(item);
        setIsEditing(true);
    };

    const handleSave = async (updatedItem: Item) => {
        try {
            const response = await fetch(`${apiEndpoint}${updatedItem.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedItem),
            });

            if (response.ok) {
                setItems((prevItems) =>
                    prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
                );
                setIsEditing(false);
            } else {
                console.error('Failed to update item');
            }
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (items.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <>
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
                        <tr className="row" key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>${item.price}</td>
                            <td className="actions">
                                <button onClick={() => onDelete(item.id)}>Delete</button>
                                <button onClick={() => handleEditClick(item)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <AddItem addItemToTable={addItemToTable}/>
            {isEditing && currentItem && (
                <EditModal
                    item={currentItem}
                    onClose={() => setIsEditing(false)}
                    onSave={handleSave}
                />
            )}
        </>
    );
};

export default Table;
