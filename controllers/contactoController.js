const { contactos } = require("../data/store");

// Enviar mensaje
const enviarContacto = (req, res) => {
    const { nombre, correo, asunto, mensaje } = req.body;

    if (!nombre || !correo || !asunto || !mensaje) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        });
    }

    const contacto = {
        id: Date.now(),
        nombre,
        correo,
        asunto,
        mensaje,
        fecha: new Date(),
        estado: "pendiente"
    };

    contactos.push(contacto);

    res.status(201).json({
        mensaje: "Mensaje enviado correctamente",
        contacto
    });
};

// Consultar mensajes
const listarContactos = (req, res) => {
    res.json(contactos);
};

// Consultar un mensaje
const obtenerContacto = (req, res) => {
    const contacto = contactos.find(
        c => c.id === Number(req.params.id)
    );

    if (!contacto) {
        return res.status(404).json({
            mensaje: "Mensaje no encontrado"
        });
    }

    res.json(contacto);
};

module.exports = {
    enviarContacto,
    listarContactos,
    obtenerContacto
};