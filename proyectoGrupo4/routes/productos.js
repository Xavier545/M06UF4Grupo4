import { Router } from "express";
import pg from 'pg';
import dbconnection from "../dbconnection.js";

const route = Router();

route.get('/', async (req, res) => {
    let pgClient = new pg.Client(dbconnection);
    await pgClient.connect();
    let result = await pgClient.query("SELECT * FROM Productos");
    res.json(result.rows);
    await pgClient.end();
}); 

export default route;
