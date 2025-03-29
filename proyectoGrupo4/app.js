import express from 'express'
import cors from 'cors'
import dbconnection from './dbconnection.js'
import producto from './routes/productos.js'
import proveedor from './routes/proveedores.js'
import cliente from './routes/clientes.js'

const app = express()
const PORT = process.env.PORT || 3000

// Configuracion de Middleware
app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Conexión a la base de datos
dbconnection.connect()
    .then(() => console.log('Conexión a PostgreSQL exitosa'))
    .catch(err => console.error('Error al conectar a PostgreSQL:', err));

// Rutas API
app.use('/api/productos', producto)
app.use('/proveedores', proveedor)
app.use('/api/clientes', cliente)

// Ruta principal redirige a clientes/index.html
app.get('/', (req, res) => {
    res.redirect('/clientes')
})

// Ruta para la sección de productos
app.get('/productos', (req, res) => {
    res.redirect('/productos/index.html')
})

// Ruta para la sección de clientes
app.get('/clientes', (req, res) => {
    res.redirect('/clientes/index.html')
})

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ error: 'Algo salió mal!' })
})

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})