import express from 'express';
import dbconnection from '../dbconnection.js';

const router = express.Router();

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        // console.log('Intentando obtener productos...');
        const result = await dbconnection.query('SELECT * FROM productos');
        // console.log('Resultado de la consulta:', result);
        // console.log('Filas obtenidas:', result.rows);
        
        // Asegurarse de que siempre devolvemos un array
        const productos = Array.isArray(result.rows) ? result.rows : [];
        res.json(productos);
    } catch (err) {
        console.error('Error al obtener productos:', err);
        res.status(500).json({ 
            error: err.message,
            details: err.stack 
        });
    }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await dbconnection.query('SELECT * FROM productos WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
    try {
        const { 
            id_proveedor, 
            codigo, 
            imagen, 
            nombre, 
            marca, 
            tipo, 
            grupo, 
            peso, 
            precio_unidad, 
            stock 
        } = req.body;
        
        const result = await dbconnection.query(
            `INSERT INTO productos (
                id_proveedor, codigo, imagen, nombre, marca, 
                tipo, grupo, peso, precio_unidad, stock
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
            [id_proveedor, codigo, imagen, nombre, marca, tipo, grupo, peso, precio_unidad, stock]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            id_proveedor, 
            codigo, 
            imagen, 
            nombre, 
            marca, 
            tipo, 
            grupo, 
            peso, 
            precio_unidad, 
            stock 
        } = req.body;

        const result = await dbconnection.query(
            `UPDATE productos SET 
                id_proveedor = $1, 
                codigo = $2, 
                imagen = $3, 
                nombre = $4, 
                marca = $5, 
                tipo = $6, 
                grupo = $7, 
                peso = $8, 
                precio_unidad = $9, 
                stock = $10 
            WHERE id = $11 RETURNING *`,
            [id_proveedor, codigo, imagen, nombre, marca, tipo, grupo, peso, precio_unidad, stock, id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await dbconnection.query('DELETE FROM productos WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router; 