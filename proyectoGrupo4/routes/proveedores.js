import { Router } from "express";
import dbconnection from '../dbconnection.js';

const route = Router();

// Obtener todos los proveedores
route.get('/', async (req, res) => {
    try {
        let result = await dbconnection.query('SELECT * FROM proveedores');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener proveedores:', error);
    }
});


// Obtener un proveedor por ID
route.get('/:id', async (req, res) => {
    try {
        let result = await dbconnection.query('SELECT * FROM proveedores WHERE id = $1', [req.params.id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener proveedor:', error);
    }
});


// Crear nuevo proveedor
route.post('/', async (req, res) => {
    try {
        let { empresa, tipo_producto, direccion, nro_tel_princ, email } = req.body;
        let result = await dbconnection.query(
            `INSERT INTO proveedores (empresa, tipo_producto, direccion, nro_tel_princ, email) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [empresa, tipo_producto, direccion, nro_tel_princ, email]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear proveedor:', error);
    }
});


// Actualizar proveedor
route.put('/:id', async (req, res) => {
    try {
        let { empresa, tipo_producto, direccion, nro_tel_princ, email } = req.body;
        let result = await dbconnection.query(
            `UPDATE proveedores 
             SET empresa = $1, tipo_producto = $2, direccion = $3, nro_tel_princ = $4, email = $5 
             WHERE id = $6 RETURNING *`,
            [empresa, tipo_producto, direccion, nro_tel_princ, email, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al actualizar proveedor:', error);
    }
});


// Eliminar proveedor
route.delete('/:id', async (req, res) => {
    try {
        let result = await dbconnection.query('DELETE FROM proveedores WHERE id = $1 RETURNING *', [req.params.id]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error al eliminar proveedor:', error);
    }
});

export default route;