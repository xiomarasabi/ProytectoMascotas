import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const crearMascotaXSR = async (req, res) => {
  const { nombre, estado, raza_id, categoria_id, genero_id, usuario_id } = req.body;
  const foto = req.file ? `/public/img/${req.file.filename}` : null;

  if (!nombre || !raza_id || !categoria_id || !genero_id || !usuario_id || !foto || !estado) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const nuevaMascota = await prisma.mascotas.create({
      data: {
        foto,
        nombre,
        estado,
        raza_id: parseInt(raza_id),
        categoria_id: parseInt(categoria_id),
        genero_id: parseInt(genero_id),
        usuario_id: parseInt(usuario_id),
      },
    });
    res.status(201).json({ message: "Mascota creada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la mascota" });
  }
};

const listarMascotasXSR = async (req, res) => {
  try {
    const mascotas = await prisma.mascotas.findMany({
      include: { razas: true, categorias: true, generos: true, usuarios: true },
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
      include: { razas: true, categorias: true, generos: true, usuarios: true },
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
  const { nombre, estado, raza_id, categoria_id, genero_id, usuario_id } = req.body;
  const foto = req.file ? `/public/img/${req.file.filename}` : req.body.foto; // Usa la nueva foto o la existente

  if (isNaN(id)) return res.status(400).json({ error: "ID no válido" });
  if (!nombre || !raza_id || !categoria_id || !genero_id || !usuario_id || !estado) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const mascotaActualizada = await prisma.mascotas.update({
      where: { id },
      data: {
        foto,
        nombre,
        estado,
        raza_id: parseInt(raza_id),
        categoria_id: parseInt(categoria_id),
        genero_id: parseInt(genero_id),
        usuario_id: parseInt(usuario_id),
      },
    });
    res.json({ message: "Mascota actualizada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la mascota" });
  }
};

const patchMascotaXSR = async (req, res) => {
  const id = parseInt(req.params.id);
  const { foto, nombre, estado, raza_id, categoria_id, genero_id, usuario_id } = req.body;

  const data = {};
  if (foto !== undefined) data.foto = foto;
  if (nombre !== undefined) data.nombre = nombre;
  if (estado !== undefined) data.estado = estado;
  if (raza_id !== undefined) data.raza_id = parseInt(raza_id);
  if (categoria_id !== undefined) data.categoria_id = parseInt(categoria_id);
  if (genero_id !== undefined) data.genero_id = parseInt(genero_id);
  if (usuario_id !== undefined) data.usuario_id = parseInt(usuario_id);

  try {
    const mascotaActualizada = await prisma.mascotas.update({
      where: { id },
      data,
    });
    res.json({ message: "Mascota actualizada correctamente" });
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

export { crearMascotaXSR, listarMascotasXSR, obtenerMascotaPorIdXSR, actualizarMascotaXSR, patchMascotaXSR, eliminarMascotaXSR };