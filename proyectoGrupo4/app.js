import express from 'express'
import pg from 'pg'
import cors from 'cors'
import producto from './routes/productos.js'

const app = express()

// Conexion a base de datos, si no funciona mira tu contraseña
const dataConnection = new pg.Client({
	user:'postgres',
	password:'Badia123',
	host:'localhost',
	port: 5432,
	database: 'supermercado',
});

dataConnection.connect()
    .then(() => console.log('Conexion a PostgreSQL exitosa'))
    .catch(err => console.error('Error al conectar a PostgreSQL:', err));

// Configuracion de Middleware
app.use(cors({ origin: '*' }));
app.use(express.static('public'));
app.use(express.json());

app.use('/productos', producto)

app.listen(3010, () => {
    console.log('Servidor en http://localhost:3010');
});