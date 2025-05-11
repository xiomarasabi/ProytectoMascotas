import express from "express";
import { createCategoriaXSR, listarCategoriasXSR, obtenerCategoriaPorIdXSR, actualizarCategoriaXSR, patchCategoriaXSR, eliminarCategoriaXSR } from "../ControllersXSR/ControllerCategoriasXSR.js";
import { verificarTokenXSR } from "../autenticacionXSR/autenticacionXSR.js";

const routerCategoriaXSR = express.Router();

routerCategoriaXSR.post("/categoriaXSR", verificarTokenXSR, createCategoriaXSR);
routerCategoriaXSR.get("/categoriaXSR", verificarTokenXSR, listarCategoriasXSR);
routerCategoriaXSR.get("/categoriaXSR/:id", verificarTokenXSR, obtenerCategoriaPorIdXSR);
routerCategoriaXSR.put("/categoriaXSR/:id", verificarTokenXSR, actualizarCategoriaXSR);
routerCategoriaXSR.patch("/categoriaXSR/:id", verificarTokenXSR, patchCategoriaXSR);
routerCategoriaXSR.delete("/categoriaXSR/:id", verificarTokenXSR, eliminarCategoriaXSR);

export default routerCategoriaXSR;