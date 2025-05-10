import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import YAML from "yamljs";

import routerUsuarioXSR from "./srcXSR/RoutersXSR/UsuariosXSR.js";
import routerRazaXSR from "./srcXSR/RoutersXSR/RazasXSR.js";
import routerCategoriaXSR from "./srcXSR/RoutersXSR/CategoriaXSR.js";
import routerGeneroXSR from "./srcXSR/RoutersXSR/GeneroXSR.js";
import routerMascotaXSR from "./srcXSR/RoutersXSR/MascotasXSR.js";
import authRouterXSR  from "./srcXSR/RoutersXSR/authRouterXSR.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouterXSR )
app.use(routerUsuarioXSR);
app.use(routerRazaXSR);
app.use(routerCategoriaXSR);
app.use(routerGeneroXSR);
app.use(routerMascotaXSR);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  //console.log(`Documentación disponible en http://localhost:${PORT}/document`);
});
