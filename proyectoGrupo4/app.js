import express from 'express'
import pg from 'pg'
import cors from 'cors'
// import producto from './routes/productos.js'
import proveedor from './routes/proveedores.js'

const app = express()

// Conexion a base de datos, si no funciona mira tu contraseña
const dbConnection = new pg.Client({
    user:'postgres',
    password:'Badia123',
    host:'localhost',
    port: 5432,
    database: 'supermercado',
    ssl: false,
    connectionTimeoutMillis: 5000,
});

dbConnection.connect()
.then(() => console.log('Conexión exitosa a la base de datos'))
.catch(err => console.error('Error de conexión:', err));

// Configuracion de Middleware
app.use(cors({ origin: '*' }));
app.use(express.static('public'));
app.use(express.json());

// Rutas API
// app.use('/productos', producto);
app.use('/proveedores', proveedor);

// Para acceder a la web desde terminal
app.listen(3010, () => {
    console.log('Servidor en http://localhost:3010');
});