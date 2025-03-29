import pkg from 'pg';
const { Pool } = pkg;

const dbconnection = new Pool({
    user: "postgres",
    host: "localhost",
    database: "Supermarket",
    password: "Pablo021",
    port: 5432,
});

export default dbconnection;