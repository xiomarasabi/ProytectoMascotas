import express from "express";
import { createUsuarioXSR, listarUsuariosXSR, obtenerUsuarioPorIdXSR, actualizarUsuarioXSR, patchUsuarioXSR, eliminarUsuarioXSR } from "../ControllersXSR/ControllerUsuariosXSR.js";
import { verificarTokenXSR } from "../autenticacionXSR/autenticacionXSR.js";

const routerUsuarioXSR = express.Router();

routerUsuarioXSR.post("/usuarioXSR",verificarTokenXSR, createUsuarioXSR);
routerUsuarioXSR.get("/usuarioXSR", verificarTokenXSR, listarUsuariosXSR);
routerUsuarioXSR.get("/usuarioXSR/:id", verificarTokenXSR, obtenerUsuarioPorIdXSR);
routerUsuarioXSR.put("/usuarioXSR/:id", verificarTokenXSR, actualizarUsuarioXSR);
routerUsuarioXSR.patch("/usuarioXSR/:id", verificarTokenXSR, patchUsuarioXSR);
routerUsuarioXSR.delete("/usuarioXSR/:id",verificarTokenXSR, eliminarUsuarioXSR);

export default routerUsuarioXSR;
