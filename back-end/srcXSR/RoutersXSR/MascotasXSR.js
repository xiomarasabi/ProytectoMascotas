import express from "express";
import { crearMascotaXSR, listarMascotasXSR, obtenerMascotaPorIdXSR, actualizarMascotaXSR, patchMascotaXSR, eliminarMascotaXSR } from "../ControllersXSR/ControllerMascotasXSR.js";
import { verificarTokenXSR } from "../autenticacionXSR/autenticacionXSR.js";
import multer from "multer"; // Importamos multer aquí
import path from "path";

const routerMascotaXSR = express.Router();

// Configuración de multer para este router
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), 'public', 'img');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

routerMascotaXSR.post("/mascotaXSR", verificarTokenXSR, upload.single('foto'), crearMascotaXSR);
routerMascotaXSR.get("/mascotaXSR", verificarTokenXSR, listarMascotasXSR);
routerMascotaXSR.get("/mascotaXSR/:id", verificarTokenXSR, obtenerMascotaPorIdXSR);
routerMascotaXSR.put("/mascotaXSR/:id", verificarTokenXSR,upload.single('foto'), actualizarMascotaXSR);
routerMascotaXSR.patch("/mascotaXSR/:id", verificarTokenXSR, patchMascotaXSR);
routerMascotaXSR.delete("/mascotaXSR/:id", verificarTokenXSR, eliminarMascotaXSR);

routerMascotaXSR.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

export default routerMascotaXSR;