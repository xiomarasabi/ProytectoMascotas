import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createRazaXSR = async (req, res) => {
  const { name } = req.body;

  try {
    const nuevaRaza = await prisma.razas.create({
      data: { name },
    });
    res.status(201).json({ message: "raza creada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear raza" });
  }
};

const listarRazasXSR = async (req, res) => {
  try {
    const razas = await prisma.razas.findMany({ 
    });
    res.json(razas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al listar razas" });
  }
};

const obtenerRazaPorIdXSR = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID no válido" });

  try {
    const raza = await prisma.razas.findUnique({
      where: { id },
      include: { mascotas: true },
    });

    if (!raza) return res.status(404).json({ error: "Raza no encontrada" });

    res.json(raza);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener raza" });
  }
};

const actualizarRazaXSR = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  if (isNaN(id)) return res.status(400).json({ error: "ID no válido" });

  try {
    const razaActualizada = await prisma.razas.update({
      where: { id },
      data: { name },
    });
    res.json({ message: "raza actualizada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar raza" });
  }
};

const patchRazaXSR = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  if (isNaN(id)) return res.status(400).json({ error: "ID no válido" });

  const data = {};
  if (name !== undefined) data.name = name;

  try {
    const razaActualizada = await prisma.razas.update({
      where: { id },
      data,
    });
    res.json({ message: "raza actualizada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar parcialmente la raza" });
  }
};

const eliminarRazaXSR = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID no válido" });

  try {
    await prisma.razas.delete({
      where: { id },
    });
    res.json({ message: "Raza eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar raza" });
  }
};

export {createRazaXSR,listarRazasXSR,obtenerRazaPorIdXSR,actualizarRazaXSR,patchRazaXSR,eliminarRazaXSR,};
