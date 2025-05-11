import express from "express";
import { createGeneroXSR, listarGenerosXSR, obtenerGeneroPorIdXSR, actualizarGeneroXSR, patchGeneroXSR, eliminarGeneroXSR } from "../ControllersXSR/ControllerGeneroXSR.js";
import { verificarTokenXSR } from "../autenticacionXSR/autenticacionXSR.js";

const routerGeneroXSR = express.Router();

routerGeneroXSR.post("/generoXSR", verificarTokenXSR, createGeneroXSR);
routerGeneroXSR.get("/generoXSR", verificarTokenXSR, listarGenerosXSR);
routerGeneroXSR.get("/generoXSR/:id", verificarTokenXSR, obtenerGeneroPorIdXSR);
routerGeneroXSR.put("/generoXSR/:id", verificarTokenXSR, actualizarGeneroXSR);
routerGeneroXSR.patch("/generoXSR/:id", verificarTokenXSR, patchGeneroXSR);
routerGeneroXSR.delete("/generoXSR/:id", verificarTokenXSR, eliminarGeneroXSR);

export default routerGeneroXSR;