
const swaggerJsDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Productos y Contacto",
            version: "1.0.0",
            description: "API REST para gestionar productos y mensajes de contacto"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },
    apis: ["./routes/*.js"]
};

module.exports = swaggerJsDoc(options);
