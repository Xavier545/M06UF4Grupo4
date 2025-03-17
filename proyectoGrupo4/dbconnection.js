import pg from 'pg'

export const dbConnection = new pg.Client({
    user:'postgres',
    password:'Badia123',
    host:'localhost',
    port: 5432,
    database: 'supermercado',
    ssl: false,
});
// dbConnection.connect()
//     .then(() => console.log('Conexión exitosa a la base de datos'))
//     .catch(err => console.error('Error de conexión:', err));

export async function dbConnect()  {
    try {
        await dbConnection.connect();
        console.log('Conexion a PostgreSQL exitosa')
    } catch (error) {
        console.error('Error al conectar a PostgreSQL:', error)
    }
}