import swaggerJsdoc from "swagger-jsdoc"

const options = {
    definition:{
        openapi: '3.0.0',
        info:{
            title: 'API - Escuela de Danzas CREAR',
            version: '1.0.0',
            description: 'Documentacion de la API REST de la pagina web CREAR'
        },
        servers: [
            { url: 'http://localhost:2026', description: 'Servidor local'}
        ],
    },
    apis: ['./modulos/**/*.mjs'],
}

export const swaggerSpec = swaggerJsdoc(options)
