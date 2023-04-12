const swaggerUi = require("swagger-ui-express")
const swaggereJsdoc = require("swagger-jsdoc")

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Mixbowl",
      description:
        "Mixbowl Node.js Swaager swagger-jsdoc 방식 RestFul API 클라이언트 UI",
    },
    servers: [
      {
        url: "http://localhost:3000", // 요청 URL
      },
    ],
  },
  apis: ['/backend/src/routes/*.js', '/backend/src/swagger/*']
}

const specs = swaggereJsdoc(options)

module.exports = { swaggerUi, specs }