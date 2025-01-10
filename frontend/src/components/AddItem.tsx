import '../styles/AddItem.css';
import { useState } from 'react';
import { Item } from '../../../backend/src/models/itemsModel';

const apiEndpoint: string = 'http://localhost:5000/api/items/';

interface AddItemProps {
    addItemToTable: (newItem: Item) => void;
}

export function AddItem({ addItemToTable }: AddItemProps) {
    let item: Item = {
        id: 0,
        name: "",
        quantity: 0,
        price: 0.0,
    }

    const [btnActive, setbtnActive] = useState(false);
    const [name, setName] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(0);
    const [price, setPrice] = useState<number>(0.0);

    const activateBtn = () => {
        setbtnActive(true);
        console.log(btnActive);
    };

    const onCancel = () => {
        setbtnActive(false);
    }    

    const saveItem = async () => {

            item = {...item, name, quantity, price};

            try {
                const response = await fetch(apiEndpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(item),
                });
                if (response.ok) {
                    const savedItem: Item = await response.json();
                    addItemToTable(savedItem); // Update the table in ItemTable
                    setbtnActive(false); // Close the modal
                    setName("");
                    setPrice(0);
                    setQuantity(0);
                } else {
                    console.error("Failed to add item.");
                }
            } catch (error) {
                console.error("Error adding item: ", error);
            }
            
    }

    return (
        <>
            <button className='addBtn' onClick={activateBtn}>Add Item</button>
            {btnActive ? 
            <div className='add-modal'>
                <div className="item-container">
                    <div className="input-column">
                        <label htmlFor="itemName">Item Name</label>
                        <input value={name} className='itemInput' name='itemName' type="text" placeholder='Item Name'onChange={(e) => {setName((e.target.value))}}/>
                    </div>
                    <div className="input-column">
                        <label htmlFor="quantity">Quantity</label>
                        <input value={quantity} className='itemInput' name='quantity' type="number" placeholder='1' onChange={(e) => {setQuantity(Number(e.target.value))}}/>
                    </div>
                    <div className="input-column">
                        <label htmlFor="quantity">Price</label>
                        <input value={price} className='itemInput' name='price' type="number" placeholder='1.99' onChange={(e) => {setPrice(Number(e.target.value))}}/>
                    </div>
                    <button onClick={saveItem}>Add</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
            : null}
        </>
    )

}