import express from 'express'
import pg from 'pg'
import cors from 'cors'
import producto from './routes/productos.js'

const app = express()

app.use("/productos", producto);

const port = 3000;

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});