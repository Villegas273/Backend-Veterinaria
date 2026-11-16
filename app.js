require("dotenv").config();

const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");

const swaggerSpec = require("./config/swagger");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerSpec)
);

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/productos", require("./routes/productoRoutes"));
app.use("/api/contacto", require("./routes/contactoRoutes"));

app.get("/", (req, res) => {
    res.json({
        mensaje: "API de productos y contacto funcionando",
        documentacion: "/api-docs"
    });
});

app.use((req, res) => {
    res.status(404).json({
        mensaje: "Ruta no encontrada"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor: http://localhost:${PORT}`);
    console.log(`Swagger: http://localhost:${PORT}/api-docs`);
});