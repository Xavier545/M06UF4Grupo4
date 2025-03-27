import pkg from 'pg';
const { Pool } = pkg;

const dbconnection = new Pool({
    user: "postgres",
    host: "localhost",
    database: "Supermercat",
    password: "Sabadellnorte31.",
    port: 5432,
});

export default dbconnection;
