const jwt = require("jsonwebtoken");
const { usuarios } = require("../data/store");

const registrar = (req, res) => {
    const { nombre, correo, password } = req.body;

    if (!nombre || !correo || !password) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        });
    }

    const existe = usuarios.find(u => u.correo === correo);

    if (existe) {
        return res.status(409).json({
            mensaje: "El correo ya está registrado"
        });
    }

    const usuario = {
        id: Date.now(),
        nombre,
        correo,
        password
    };

    usuarios.push(usuario);

    res.status(201).json({
        mensaje: "Usuario registrado correctamente",
        usuario: {
            id: usuario.id,
            nombre: usuario.nombre,
            correo: usuario.correo
        }
    });
};

const login = (req, res) => {
    const { correo, password } = req.body;

    const usuario = usuarios.find(
        u => u.correo === correo && u.password === password
    );

    if (!usuario) {
        return res.status(401).json({
            mensaje: "Credenciales incorrectas"
        });
    }

    const token = jwt.sign(
        {
            id: usuario.id,
            correo: usuario.correo
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "2h"
        }
    );

    res.json({
        mensaje: "Inicio de sesión exitoso",
        token,
        usuario: {
            id: usuario.id,
            nombre: usuario.nombre,
            correo: usuario.correo
        }
    });
};

module.exports = {
    registrar,
    login
};