import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const createUsuarioXSR = async (req, res) => {
  const { nombre, email, password, mascota_id } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = await prisma.usuarios.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
        mascota_id,
      },
    });

    res.status(200).json({ message: "usuario actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear un usuario" });
  }
};

const listarUsuariosXSR = async (req, res) => {
  try {
    const usuarios = await prisma.usuarios.findMany({
      include: { mascotas: true }, 
    });
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al listar usuarios" });
  }
};

const obtenerUsuarioPorIdXSR = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID no válido" });

  try {
    const usuario = await prisma.usuarios.findUnique({
      where: { id },
      include: { mascotas: true }, 
    });

    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener usuario por ID" });
  }
};

const actualizarUsuarioXSR = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID no válido" });

  const { nombre, email, password, mascota_id } = req.body;

  try {
    const usuarioActualizado = await prisma.usuarios.update({
      where: { id },
      data: { nombre, email, password, mascota_id },
    });

    res.json({ message: "usuario actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

const patchUsuarioXSR = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID no válido" });

  const { nombre, email, password, mascota_id } = req.body;

  const data = {};
  if (nombre !== undefined) data.nombre = nombre;
  if (email !== undefined) data.email = email;
  if (password !== undefined) data.password = password;
  if (mascota_id !== undefined) data.mascota_id = mascota_id;

  try {
    const usuarioActualizado = await prisma.usuarios.update({
      where: { id },
      data,
    });

    res.json({ message: "usuario actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar parcialmente el usuario" });
  }
};

const eliminarUsuarioXSR = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID no válido" });

  try {
    await prisma.usuarios.delete({
      where: { id },
    });
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};

export {createUsuarioXSR, listarUsuariosXSR,obtenerUsuarioPorIdXSR,actualizarUsuarioXSR,patchUsuarioXSR,eliminarUsuarioXSR,};
