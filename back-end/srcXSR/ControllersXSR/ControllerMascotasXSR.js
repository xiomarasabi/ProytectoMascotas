import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const crearMascotaXSR = async (req, res) => {
  const { foto, nombre, estado, raza_id, categoria_id, genero_id } = req.body;

  try {
    const nuevaMascota = await prisma.mascotas.create({
      data: { foto, nombre, estado, raza_id, categoria_id, genero_id },
    });
    res.status(201).json({ message: "mascota creada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la mascota" });
  }
};

const listarMascotasXSR = async (req, res) => {
  try {
    const mascotas = await prisma.mascotas.findMany({
      include: {
        razas: true,
        categorias: true,
        generos: true,
        usuarios: true,
      },
    });
    res.json(mascotas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al listar mascotas" });
  }
};

const obtenerMascotaPorIdXSR = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID no válido" });

  try {
    const mascota = await prisma.mascotas.findUnique({
      where: { id },
      include: {
        razas: true,
        categorias: true,
        generos: true,
        usuarios: true,
      },
    });

    if (!mascota) return res.status(404).json({ error: "Mascota no encontrada" });

    res.json(mascota);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la mascota" });
  }
};

const actualizarMascotaXSR = async (req, res) => {
  const id = parseInt(req.params.id);
  const { foto, nombre, estado, raza_id, categoria_id, genero_id } = req.body;

  try {
    const mascotaActualizada = await prisma.mascotas.update({
      where: { id },
      data: { foto, nombre, estado, raza_id, categoria_id, genero_id },
    });
    res.json({ message: "mascota actualizada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la mascota" });
  }
};

const patchMascotaXSR = async (req, res) => {
  const id = parseInt(req.params.id);
  const { foto, nombre, estado, raza_id, categoria_id, genero_id } = req.body;

  const data = {};
  if (foto !== undefined) data.foto = foto;
  if (nombre !== undefined) data.nombre = nombre;
  if (estado !== undefined) data.estado = estado;
  if (raza_id !== undefined) data.raza_id = raza_id;
  if (categoria_id !== undefined) data.categoria_id = categoria_id;
  if (genero_id !== undefined) data.genero_id = genero_id;

  try {
    const mascotaActualizada = await prisma.mascotas.update({
      where: { id },
      data,
    });
    res.json({ message: "mascota actualizada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al hacer actualización parcial de la mascota" });
  }
};

const eliminarMascotaXSR = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.mascotas.delete({
      where: { id },
    });
    res.json({ message: "Mascota eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la mascota" });
  }
};

export {crearMascotaXSR,listarMascotasXSR,obtenerMascotaPorIdXSR,actualizarMascotaXSR,patchMascotaXSR,eliminarMascotaXSR,};
