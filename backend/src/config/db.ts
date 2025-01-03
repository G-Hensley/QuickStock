import { error } from "console";

const { Pool } = require('pg');

// Creates a connection to the Postgre database to perform queries
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '3265',
    port: 5432,
});

// Create item interface for returning items table values
interface Item {
    id: number;
    name: string;
    quantity: number;
    price: number;
};

// Adds a single item to the items table
async function addItem(item: (string | number)[]): Promise<Item[]> {
    
    try {
        const queryText: string = 'INSERT INTO items(name, quantity, price) VALUES($1, $2, $3) RETURNING *';
    const values = item;
    const res = await pool.query(queryText, values);
    console.log(res.rows[0]);
    return res.rows[0] as Item[];
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error adding item: ', error.message);
        } else {
            console.error('Unknown error: ', error);
        }
        throw error;
    }

};

// Simple SELECT all command to get all rows from the table
async function readAll(): Promise<Item[]> {
    
    try {
        const res = await pool.query('SELECT * FROM items ORDER BY id');
        console.log(res.rows);
        return res.rows as Item[];
    } catch (error) {
        if (error instanceof Error) {
            console.log('Error reading items: ', error.message);
        } else {
            console.log('Unknown error: ', error);
        }
        throw error;
    }

}

// Select command that reads a row at a given id
async function readOne(id: number): Promise<Item | null> {
    const queryText: string = 'SELECT * FROM items WHERE id = $1';

    try {
        const res = await pool.query(queryText, [id]);
        if (res.rows.length > 0) {
            console.log('Item found:', res.rows[0]);
            return res.rows[0] as Item;
        } else {
            console.log('No item found with the given ID');
            return null;
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log('Error reading item:', error.message);
        } else {
            console.log('Unknown error:', error);
        }
        throw error;
    }
}

// Update command function for items table
async function updateItems(updatedItem: Partial<Item>): Promise<Item | null> {
    
    const queryText: string = 'UPDATE items SET name = COALESCE($1, name), quantity = COALESCE($2, quantity), price = COALESCE($3, price) WHERE id = $4 RETURNING *';
    const values = [updatedItem.name, updatedItem.quantity, updatedItem.price, updatedItem.id];

    try {
        const res = await pool.query(queryText, values);
        console.log(res.rows[0]);
        return res.rows[0] as Item;
    } catch (error) {
        if (error instanceof Error) {
            console.log('Error updating item: ', error.message);
        } else {
            console.log('Unknown error: ', error);
        }
        throw error;
    }


}

