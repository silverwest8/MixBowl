const swaggerUi = require("swagger-ui-express")
const swaggereJsdoc = require("swagger-jsdoc")

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Mixbowl",
      description: "This is Mixbowl's API with swagger",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000", // 요청 URL
        description: "Development server"
      },
    ],
  },
  apis: ['./src/swagger/*', './src/routes/*.js', ]
}

const specs = swaggereJsdoc(options)

module.exports = { swaggerUi, specs }