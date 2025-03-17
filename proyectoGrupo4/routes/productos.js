import { Router } from "express";
import pg from 'pg'

const route = Router();

route.get('/', (req, res) => {
    res.send('Lista de productos');
});

route.get('/:id', (req, res) => {
    res.send(`Detalles del producto ${req.params.id}`);
});

export default route