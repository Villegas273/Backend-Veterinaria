const { productos } = require("../data/store");


const crearProducto = (req, res) => {
    const { nombre, descripcion, precio, categoria } = req.body;

    if (!nombre || precio === undefined || !categoria) {
        return res.status(400).json({
            mensaje: "Completa los campos obligatorios"
        });
    }

    const valor = Number(precio);

    if (!Number.isFinite(valor) || valor < 0) {
        return res.status(400).json({
            mensaje: "Precio inválido"
        });
    }

    const producto = {
        id: Date.now(),
        nombre,
        descripcion: descripcion || "",
        precio: valor,
        categoria,
        usuarioId: req.usuario.id
    };

    productos.push(producto);

    res.status(201).json({
        mensaje: "Producto creado correctamente",
        producto
    });
};

// Listar productos propios
const listarProductos = (req, res) => {
    const resultado = productos.filter(
        p => p.usuarioId === req.usuario.id
    );

    res.json(resultado);
};

// Obtener producto
const obtenerProducto = (req, res) => {
    const producto = productos.find(
        p => p.id === Number(req.params.id) &&
             p.usuarioId === req.usuario.id
    );

    if (!producto) {
        return res.status(404).json({
            mensaje: "Producto no encontrado"
        });
    }

    res.json(producto);
};

// Actualizar producto
const actualizarProducto = (req, res) => {
    const producto = productos.find(
        p => p.id === Number(req.params.id) &&
             p.usuarioId === req.usuario.id
    );

    if (!producto) {
        return res.status(404).json({
            mensaje: "Producto no encontrado"
        });
    }

    const { nombre, descripcion, precio, categoria } = req.body;

    if (precio !== undefined) {
        const valor = Number(precio);

        if (!Number.isFinite(valor) || valor < 0) {
            return res.status(400).json({
                mensaje: "Precio inválido"
            });
        }

        producto.precio = valor;
    }

    if (nombre !== undefined) producto.nombre = nombre;
    if (descripcion !== undefined) producto.descripcion = descripcion;
    if (categoria !== undefined) producto.categoria = categoria;

    res.json({
        mensaje: "Producto actualizado correctamente",
        producto
    });
};

// Eliminar producto
const eliminarProducto = (req, res) => {
    const index = productos.findIndex(
        p => p.id === Number(req.params.id) &&
             p.usuarioId === req.usuario.id
    );

    if (index === -1) {
        return res.status(404).json({
            mensaje: "Producto no encontrado"
        });
    }

    productos.splice(index, 1);

    res.json({
        mensaje: "Producto eliminado correctamente"
    });
};

module.exports = {
    crearProducto,
    listarProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto
};