import express from "express";
import { crearMascotaXSR,listarMascotasXSR,obtenerMascotaPorIdXSR,actualizarMascotaXSR,patchMascotaXSR,eliminarMascotaXSR,} from "../ControllersXSR/ControllerMascotasXSR.js";
import { verificarTokenXSR } from "../autenticacionXSR/autenticacionXSR.js";
const routerMascotaXSR = express.Router();

routerMascotaXSR.post("/mascotaXSR",verificarTokenXSR, crearMascotaXSR);
routerMascotaXSR.get("/mascotaXSR", verificarTokenXSR, listarMascotasXSR);
routerMascotaXSR.get("/mascotaXSR/:id",verificarTokenXSR, obtenerMascotaPorIdXSR);
routerMascotaXSR.put("/mascotaXSR/:id", verificarTokenXSR, actualizarMascotaXSR);
routerMascotaXSR.patch("/mascotaXSR/:id",verificarTokenXSR, patchMascotaXSR);
routerMascotaXSR.delete("/mascotaXSR/:id",verificarTokenXSR, eliminarMascotaXSR);

export default routerMascotaXSR;
