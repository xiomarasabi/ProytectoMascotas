import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import YAML from "yamljs";
import multer from "multer";
import path from "path";

import routerUsuarioXSR from "./srcXSR/RoutersXSR/UsuariosXSR.js";
import routerRazaXSR from "./srcXSR/RoutersXSR/RazasXSR.js";
import routerCategoriaXSR from "./srcXSR/RoutersXSR/CategoriaXSR.js";
import routerGeneroXSR from "./srcXSR/RoutersXSR/GeneroXSR.js";
import routerMascotaXSR from "./srcXSR/RoutersXSR/MascotasXSR.js";
import authRouterXSR from "./srcXSR/RoutersXSR/authRouterXSR.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Configuración de multer para subir fotos
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

// Servir archivos estáticos desde la carpeta public
app.use('/public', express.static(path.join(process.cwd(), 'public')));

app.use(authRouterXSR);
app.use(routerUsuarioXSR);
app.use(routerRazaXSR);
app.use(routerCategoriaXSR);
app.use(routerGeneroXSR);
app.use(routerMascotaXSR);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});
// Ruta para la documentación
app.get('/document', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'document.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación disponible en http://localhost:${PORT}/public/document.html`);
});