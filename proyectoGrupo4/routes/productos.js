import { Router } from "express";
import pg from 'pg'
// import dbConnection from "./../dbconnection.js";

const route = Router();

const dbConnection = new pg.Client({
    user:'postgres',
    password:'Badia123',
    host:'localhost',
    port: 5432,
    database: 'supermercado',
    ssl: false,
    connectionTimeoutMillis: 5000,
});

route.get('/', async (req, res) => {
    let pgClient = new pg.Client(dbConnection);
    await pgClient.connect();
    let result = await pgClient.query('select * from productos');
    res.json(result.rows);
    await pgClient.end();
});

// route.get('/:id', (req, res) => {
//     res.send(`Detalles del producto ${req.params.id}`);
// });

export default route