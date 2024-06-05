import express from "express";
import * as AgendaController from "../controller/AgendaController.js";
import { auth as checkAuth } from "../middlewares/auth.js";

const router = express.Router();


// Definir rutas
router.post("/create",checkAuth, AgendaController.crearAgenda);
router.delete("/delete/:id",checkAuth, AgendaController.borrarAgenda);
router.put("/update/:id", checkAuth, AgendaController.updateAgenda);


// Exportar router
export default router;

