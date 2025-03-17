import { Router } from "express";
import pg from 'pg';

const route = Router();

const dbConnection = new pg.Client({
    user:'postgres',
    password:'Badia123',
    host:'localhost',
    port: 5432,
    database: 'supermercado',
    ssl: false,
});

route.get('/', async (req, res) => {
    let pgClient = new pg.Client(dbConnection);
    await pgClient.connect();
    let result = await pgClient.query('select * from proveedores');
    res.json(result.rows);
    await pgClient.end();
});

export default route