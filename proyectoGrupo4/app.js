import express from 'express'
import productos from './routes/productos.js';

const app = express()
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta public
app.use(express.static('public'));

// Rutas API
app.use('/api/productos', productos);

// Ruta principal redirige a productos/index.html
app.get('/', (req, res) => {
    res.redirect('/productos');
});

// Ruta para la sección de productos
app.get('/productos', (req, res) => {
    res.redirect('/productos/index.html');
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal!' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});