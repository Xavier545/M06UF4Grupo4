import pg from 'pg';

const dbconnection = new pg.Client({
    user: 'postgres',
    password: 'Pablo021',
    host: 'localhost',
    port: 5432,
    database: 'Supermarket',
    ssl: false
});

export default dbconnection;