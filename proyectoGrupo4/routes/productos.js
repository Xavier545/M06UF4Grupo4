import { Router } from "express";
import pg from 'pg';
import dbconnection from "../dbconnection";

const route = Router();

route.get('/', async (req, res) => {
    let pgClient = new pg.Client(dbconnection)
    await pg.Client.connect();
    let result = await pg.Client.query("select * from Productos");
    res.json(result.rows);
    await pg.Client.end();
}); 

export default route;
