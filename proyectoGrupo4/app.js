import express from 'express';
import cors from 'cors';
import producto from './routes/productos.js';
import dbconnection from './dbconnection.js';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conexión a la base de datos
dbconnection.connect()
    .then(() => console.log('Conexión a PostgreSQL exitosa'))
    .catch(err => console.error('Error al conectar a PostgreSQL:', err));

// Configuración de Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/productos', producto);

// Servir archivo HTML desde views
app.get('/viewer', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'product.html'));
});

// Servidor en el puerto 3010
app.listen(3010, () => {
    console.log('Servidor en http://localhost:3010');
});
