import pkg from 'pg';
const { Pool } = pkg;

const dbconnection = new Pool({
    user: "postgres",
    host: "localhost",
    database: "supermercado",
    password: "badia123",
    port: 5432,
});

export default dbconnection;
