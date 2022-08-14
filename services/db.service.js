const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Woody181',
    port: 5432,
    database: 'website'
});

