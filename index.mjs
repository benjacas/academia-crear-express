import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

// Rutas
import rutasClases   from './modulos/clases/rutas.clases.mjs'
import rutasContacto from './modulos/contacto/rutas.contacto.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

const app    = express()
const PUERTO = 2026

app.use(express.json())

// Servir el front
app.use(express.static(__dirname + '/front'))

// ── Rutas de la API 

// API publica — solo lectura para el sitio web 
app.use('/api/clases',   rutasClases)
app.use('/api/contacto', rutasContacto)

app.listen(PUERTO, () => {
    console.log(`Servidor en http://localhost:${PUERTO}`);
});

