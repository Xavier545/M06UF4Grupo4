import express from 'express';
import dbconnection from '../dbconnection.js';

const router = express.Router();

// Obtener todos los clientes
router.get('/', async (req, res) => {
    try {
        console.log('Intentando obtener clientes...');
        const result = await dbconnection.query('SELECT * FROM clientes');
        console.log('Resultado de la consulta:', result);
        console.log('Filas obtenidas:', result.rows);
        
        // Asegurarse de que siempre devolvemos un array
        const clientes = Array.isArray(result.rows) ? result.rows : [];
        res.json(clientes);
    } catch (err) {
        console.error('Error al obtener clientes:', err);
        res.status(500).json({ 
            error: err.message,
            details: err.stack 
        });
    }
});

// Obtener un cliente por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await dbconnection.query('SELECT * FROM clientes WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Crear un nuevo cliente
router.post('/', async (req, res) => {
    try {
        const { 
            id, 
            nombre, 
            apellido, 
            tipo_doc, 
            nro_doc, 
            nro_tel_princ, 
            nro_tel_sec, 
            email
        } = req.body;
        
        const result = await dbconnection.query(
            `INSERT INTO clientes (
                id, nombre, tipo_doc, nro_doc, nro_tel_princ, 
                nro_tel_sec, email
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [id, nombre, apellido, tipo_doc, nro_doc, nro_tel_princ, nro_tel_sec, email]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Actualizar un cliente
router.put('/:id', async (req, res) => {
    try {
        const { ids } = req.params;
        const { 
            id, 
            nombre, 
            apellido, 
            tipo_doc, 
            nro_doc, 
            nro_tel_princ, 
            nro_tel_sec, 
            email
        } = req.body;

        const result = await dbconnection.query(
            `UPDATE clientes SET 
                id = $1, 
                nombre = $2, 
                apellido = $3, 
                tipo_doc = $4, 
                nro_doc = $5, 
                nro_tel_princ = $6, 
                nro_tel_sec = $7, 
                email = $8, 
            WHERE id = $9 RETURNING *`,
            [id, nombre, apellido, tipo_doc, nro_doc, nro_tel_princ, nro_tel_sec, email, ids]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Eliminar un cliente
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await dbconnection.query('DELETE FROM clientes WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.json({ message: 'Cliente eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router; 