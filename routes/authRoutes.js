
const express = require("express");
const router = express.Router();

const {
    registrar,
    login
} = require("../controllers/authController");
console.log("Registrar:", typeof registrar);
console.log("Login:", typeof login);

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Registro e inicio de sesión
 */

/**
 * @swagger
 * /api/auth/registro:
 *   post:
 *     summary: Registrar un usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - correo
 *               - password
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Juan Pérez
 *               correo:
 *                 type: string
 *                 example: juan@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Todos los campos son obligatorios
 *       409:
 *         description: El correo ya está registrado
 */
router.post("/registro", registrar);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - correo
 *               - password
 *             properties:
 *               correo:
 *                 type: string
 *                 example: juan@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       401:
 *         description: Credenciales incorrectas
 */
router.post("/login", login);

module.exports = router;
