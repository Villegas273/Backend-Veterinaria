
const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
    enviarContacto,
    listarContactos,
    obtenerContacto
} = require("../controllers/contactoController");

/**
 * @swagger
 * tags:
 *   name: Contacto
 *   description: Gestión de mensajes de contacto
 */

/**
 * @swagger
 * /api/contacto:
 *   post:
 *     summary: Enviar un mensaje de contacto
 *     tags: [Contacto]
 *     responses:
 *       201:
 *         description: Mensaje enviado correctamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/", enviarContacto);

/**
 * @swagger
 * /api/contacto:
 *   get:
 *     summary: Listar todos los mensajes de contacto
 *     tags: [Contacto]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de mensajes
 *       401:
 *         description: No autorizado
 */
router.get("/", auth, listarContactos);

/**
 * @swagger
 * /api/contacto/{id}:
 *   get:
 *     summary: Obtener un mensaje por ID
 *     tags: [Contacto]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Mensaje encontrado
 *       404:
 *         description: Mensaje no encontrado
 */
router.get("/:id", auth, obtenerContacto);

module.exports = router;
