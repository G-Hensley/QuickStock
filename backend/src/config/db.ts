const { Pool } = require('pg');

// Creates a connection to the Postgre database to perform queries
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '3265',
    port: 5432,
});

process.on('SIGINT', async () => {
    await pool.end();
    console.log('Database connection pool closed');
    process.exit(0);
});

export { pool };