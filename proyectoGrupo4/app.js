import express from 'express'
import pg from 'pg'
import cors from 'cors'
import producto from './routes/productos'

const app = express()

app.use('/productos', producto)

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Permite recibir JSON en las peticiones
app.use(cors()); // Habilita CORS

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ message: 'Servidor funcionando! 🚀' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});