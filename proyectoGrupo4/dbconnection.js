import pkg from 'pg';
const { Pool } = pkg;

const dbconnection = new Pool({
    user: "postgres",
    host: "localhost",
    database: "supermercado",
    password: "Badia123",
    port: 5432,
});

export default dbconnection;
