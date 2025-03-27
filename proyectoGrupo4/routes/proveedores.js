import { Router } from "express";
import dbconnection from '../dbconnection.js';

const route = Router();

// Obtener todos los proveedores
route.get('/', async (req, res) => {
    try {
        const result = await dbconnection.query('SELECT * FROM proveedores');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener proveedores:', error);
        res.status(500).json({ error: 'Error al obtener proveedores: ' + error.message });
    }
});

// Obtener un proveedor por ID
route.get('/:id', async (req, res) => {
    try {
        const result = await dbconnection.query('SELECT * FROM proveedores WHERE id = $1', [req.params.id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Proveedor no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener proveedor:', error);
        res.status(500).json({ error: 'Error al obtener proveedor: ' + error.message });
    }
});

// Crear nuevo proveedor
route.post('/', async (req, res) => {
    try {
        const { empresa, tipo_producto, direccion, nro_tel_princ, email } = req.body;
        const result = await dbconnection.query(
            `INSERT INTO proveedores (empresa, tipo_producto, direccion, nro_tel_princ, email) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [empresa, tipo_producto, direccion, nro_tel_princ, email]
        );
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Error al insertar Proveedor' });
        }
    } catch (error) {
        console.error('Error al crear proveedor:', error);
        res.status(500).json({ error: 'Error al crear proveedor: ' + error.message });
    }
});

// Actualizar proveedor
route.put('/:id', async (req, res) => {
    try {
        const { empresa, tipo_producto, direccion, nro_tel_princ, email } = req.body;
        const result = await dbconnection.query(
            `UPDATE proveedores 
             SET empresa = $1, tipo_producto = $2, direccion = $3, nro_tel_princ = $4, email = $5 
             WHERE id = $6 RETURNING *`,
            [empresa, tipo_producto, direccion, nro_tel_princ, email, req.params.id]
        );
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Proveedor no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar proveedor:', error);
        res.status(500).json({ error: 'Error al actualizar proveedor: ' + error.message });
    }
});

// Eliminar proveedor
route.delete('/:id', async (req, res) => {
    try {
        const result = await dbconnection.query('DELETE FROM proveedores WHERE id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length > 0) {
            res.json({ message: 'Proveedor eliminado correctamente' });
        } else {
            res.status(404).json({ error: 'Proveedor no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar proveedor:', error);
        res.status(500).json({ error: 'Error al eliminar proveedor: ' + error.message });
    }
});

export default route;