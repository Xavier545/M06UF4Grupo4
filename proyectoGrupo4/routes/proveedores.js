import { Router } from "express";
import pg from 'pg';


const route = Router();

const pool = new pg.Pool({
    user: 'postgres',
    password: 'Badia123',
    host: 'localhost',
    port: 5432,
    database: 'supermercado',
    ssl: false,
    connectionTimeoutMillis: 5000,
  });

route.get('/', async (req, res) => {
    const result = await pool.query('SELECT * FROM proveedores');
    res.json(result.rows);
});

route.get('/:id', async (req, res) => {
    const result = await pool.query('SELECT * FROM proveedores WHERE id = $1', [req.params.id]);
    res.json(result.rows);
});

export default route