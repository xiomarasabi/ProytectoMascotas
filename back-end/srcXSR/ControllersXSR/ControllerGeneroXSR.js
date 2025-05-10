import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createGeneroXSR = async (req, res) => {
  const { nombre } = req.body;

  try {
    const nuevoGenero = await prisma.generos.create({ data: { nombre } });
    res.status(200).json(nuevoGenero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el género" });
  }
};

const listarGenerosXSR = async (req, res) => {
  try {
    const generos = await prisma.generos.findMany({
    });
    res.json(generos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al listar géneros" });
  }
};

const obtenerGeneroPorIdXSR = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID no válido" });

  try {
    const genero = await prisma.generos.findUnique({
      where: { id },
      include: { mascotas: true },
    });

    if (!genero) return res.status(404).json({ error: "Género no encontrado" });

    res.json(genero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el género" });
  }
};

const actualizarGeneroXSR = async (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre } = req.body;

  try {
    const generoActualizado = await prisma.generos.update({
      where: { id },
      data: { nombre },
    });

    res.json(generoActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el género" });
  }
};

const patchGeneroXSR = async (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre } = req.body;

  const data = {};
  if (nombre !== undefined) data.nombre = nombre;

  try {
    const generoActualizado = await prisma.generos.update({
      where: { id },
      data,
    });

    res.json(generoActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar parcialmente el género" });
  }
};

const eliminarGeneroXSR = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.generos.delete({ where: { id } });
    res.json({ message: "Género eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el género" });
  }
};

export {createGeneroXSR,listarGenerosXSR,obtenerGeneroPorIdXSR,actualizarGeneroXSR,patchGeneroXSR,eliminarGeneroXSR,};
