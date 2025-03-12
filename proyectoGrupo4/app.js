import express from 'express'
import vendedor from './routes/vendedor';

const app = express()
const dataConnection = {
	user:'postgres',
	password:'mysecret',
	host:'localhost',
	port: 5432,
	database: 'supermercado',
}