import express from 'express'
import pg from 'pg'
import cors from 'cors'
import producto from './routes/productos'

const app = express()

app.use('/productos', producto)