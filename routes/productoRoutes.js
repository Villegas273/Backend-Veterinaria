
const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
    crearProducto,
    listarProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto
} = require("../controllers/productoController");

/**
 * @swagger
 * /api/productos:
 *   post:
 *     summary: Crear un producto
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - precio
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Alimento para perros
 *               descripcion:
 *                 type: string
 *                 example: Alimento para perros adultos
 *               precio:
 *                 type: number
 *                 example: 15000
 *               categoria:
 *                 type: string
 *                 example: Alimentos
 *     responses:
 *       201:
 *         description: Producto creado correctamente
 *       400:
 *         description: Datos incorrectos
 *       401:
 *         description: No autorizado
 */
router.post("/", auth, crearProducto);
router.post("/", auth, crearProducto);

/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Listar todos los productos
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos
 *       401:
 *         description: No autorizado
 */
router.get("/", auth, listarProductos);

/**
 * @swagger
 * /api/productos/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Productos]
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
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
router.get("/:id", auth, obtenerProducto);

/**
 * @swagger
 * /api/productos/{id}:
 *   put:
 *     summary: Actualizar un producto
 *     tags: [Productos]
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
 *         description: Producto actualizado correctamente
 *       404:
 *         description: Producto no encontrado
 */
router.put("/:id", auth, actualizarProducto);

/**
 * @swagger
 * /api/productos/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Productos]
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
 *         description: Producto eliminado correctamente
 *       404:
 *         description: Producto no encontrado
 */
router.delete("/:id", auth, eliminarProducto);

module.exports = router;
