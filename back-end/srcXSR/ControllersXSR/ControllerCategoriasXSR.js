import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createCategoriaXSR = async (req, res) => {
  const { nombre } = req.body;

  try {
    const nuevaCategoria = await prisma.categorias.create({ data: { nombre } });
    res.status(200).json(nuevaCategoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la categoría" });
  }
};

const listarCategoriasXSR = async (req, res) => {
  try {
    const categorias = await prisma.categorias.findMany({
    });
    res.json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al listar categorías" });
  }
};

const obtenerCategoriaPorIdXSR = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID no válido" });

  try {
    const categoria = await prisma.categorias.findUnique({
      where: { id },
      include: { mascotas: true },
    });

    if (!categoria) return res.status(404).json({ error: "Categoría no encontrada" });

    res.json(categoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la categoría" });
  }
};

const actualizarCategoriaXSR = async (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre } = req.body;

  try {
    const categoriaActualizada = await prisma.categorias.update({
      where: { id },
      data: { nombre },
    });

    res.json(categoriaActualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la categoría" });
  }
};

const patchCategoriaXSR = async (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre } = req.body;

  const data = {};
  if (nombre !== undefined) data.nombre = nombre;

  try {
    const categoriaActualizada = await prisma.categorias.update({
      where: { id },
      data,
    });

    res.json(categoriaActualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar parcialmente la categoría" });
  }
};

const eliminarCategoriaXSR = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.categorias.delete({ where: { id } });
    res.json({ message: "Categoría eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la categoría" });
  }
};

export {createCategoriaXSR,listarCategoriasXSR,obtenerCategoriaPorIdXSR,actualizarCategoriaXSR,patchCategoriaXSR,eliminarCategoriaXSR,};
