import express from 'express'
import cors from 'cors'
import { dbConnect } from './dbconnection.js'
import producto from './routes/productos.js'
import proveedor from './routes/proveedores.js'

const app = express()
const PORT = process.env.PORT || 3000

// Conectar a la base de datos
dbConnect()

// Configuracion de Middleware
app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rutas API
app.use('/api/productos', producto)
app.use('/proveedores', proveedor)

// Ruta principal redirige a productos/index.html
app.get('/', (req, res) => {
    res.redirect('/productos')
})

// Ruta para la sección de productos
app.get('/productos', (req, res) => {
    res.redirect('/productos/index.html')
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