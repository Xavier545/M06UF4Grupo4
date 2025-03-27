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

route.post('/', async (req, res) => {
    console.log(req.body);
    const result = await pool.query(`INSERT INTO proveedores (empresa, tipo_producto, direccion, nro_tel_princ, 
        nro_tel_sec, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [req.body.empresa, req.body.tipo_producto, req.body.direccion, req.body.nro_tel_princ,
        req.body.nro_tel_sec, req.body.email]
    ); // "RETURNING *" sirve para poder devolver el json en respuesta
    if (result.rows.length > 0) { res.json(result.rows[0]);
    } else { res.status(404).send('Error al insertar Proveedor'); }
});

route.put('/:id', async (req, res) => {
    const result = await pool.query(`UPDATE proveedores SET empresa = $1, tipo_producto = $2, 
        direccion = $3, nro_tel_princ = $4, nro_tel_sec = $5, email = $6 WHERE id = $7 RETURNING *`,
        [req.body.empresa, req.body.tipo_producto, req.body.direccion, req.body.nro_tel_princ,
            req.body.nro_tel_sec, req.body.email, req.params.id]
    ); // "RETURNING *" sirve para poder devolver el json en respuesta
    if (result.rows.length > 0) { res.json(result.rows[0]);
    } else { res.status(404).send('Proveedor no encontrado'); }
});

route.delete('/:id', async (req, res) => {
    const result = await pool.query('DELETE FROM proveedores WHERE id = $1', [req.params.id]);
    res.json(result.rows);
});

export default route