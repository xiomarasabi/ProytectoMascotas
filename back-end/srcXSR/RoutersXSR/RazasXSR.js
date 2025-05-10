import express from "express";
import {createRazaXSR,listarRazasXSR,obtenerRazaPorIdXSR,actualizarRazaXSR,patchRazaXSR,eliminarRazaXSR,} from "../ControllersXSR/ControllerRazasXSR.js"; 
import { verificarTokenXSR } from "../autenticacionXSR/autenticacionXSR.js";

const routerRazaXSR = express.Router();

routerRazaXSR.post("/razaXSR",verificarTokenXSR, createRazaXSR);
routerRazaXSR.get("/razaXSR", verificarTokenXSR, listarRazasXSR);
routerRazaXSR.get("/razaXSR/:id",verificarTokenXSR, obtenerRazaPorIdXSR);
routerRazaXSR.put("/razaXSR/:id", verificarTokenXSR,actualizarRazaXSR);
routerRazaXSR.patch("/razaXSR/:id", verificarTokenXSR, patchRazaXSR);
routerRazaXSR.delete("/razaXSR/:id", verificarTokenXSR, eliminarRazaXSR);

export default routerRazaXSR;
