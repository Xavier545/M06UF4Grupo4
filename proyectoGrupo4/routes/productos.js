import { Router } from "express";
import dbconnection from "../dbconnection.js";

const route = Router();

route.get('/', async (req, res) => {
    try {
        const result = await dbconnection.query("SELECT * FROM Productos");
        res.json(result.rows);
    } catch (error) {
        console.error("Error en la consulta:", error);
        res.status(500).json({ error: "Error al obtener productos" });
    }
}); 

export default route;
