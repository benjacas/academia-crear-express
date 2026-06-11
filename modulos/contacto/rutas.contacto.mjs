import { Router } from 'express'
import { recibirContacto } from './controlador.contacto.mjs'

const router = Router()

/**
 * @swagger
 * /api/contacto:
 *   post:
 *     summary: Recibe un mensaje de contacto
 *     tags:
 *       - Contacto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - mensaje
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               telefono:
 *                 type: string
 *               clases:
 *                 type: string
 *               mensaje:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Mensaje recibido
 *       '400':
 *         description: Datos obligatorios faltantes
 *       '500':
 *         description: Error interno del servidor
 */
router.post('/', recibirContacto)

export default router
