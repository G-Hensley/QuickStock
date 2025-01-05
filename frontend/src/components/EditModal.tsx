import React, { useState } from 'react';
import '../styles/EditModal.css';

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
        <div className='modal-bg'>
            <div className='edit-container'>
                <h2>Edit Item</h2>
                <div className="info-container">
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
        </div>
    );
};

export default EditModal;
