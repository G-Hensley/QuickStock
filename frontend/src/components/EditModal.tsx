import React, { useState } from 'react';

interface Item {
    id: number;
    name: string;
    quantity: number;
    price: number;
}

interface EditModalProps {
    item: Item;
    onClose: () => void;
    onSave: (updatedItem: Item) => void;
}

const EditModal: React.FC<EditModalProps> = ({ item, onClose, onSave }) => {
    const [name, setName] = useState(item.name);
    const [quantity, setQuantity] = useState(item.quantity);
    const [price, setPrice] = useState(item.price);

    const handleSave = () => {
        onSave({ ...item, name, quantity, price });
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
            }}>
                <h2>Edit Item</h2>
                <label>
                    Name:
                    <input value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    Quantity:
                    <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
                </label>
                <label>
                    Price:
                    <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                </label>
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default EditModal;
