import { Router } from 'express'
import { autenticar, cerrarSesion } from './autenticacion.mjs'

const router = Router()

/**
 * @swagger
 * /autenticar:
 *   post:
 *     summary: Inicia sesión
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - usuario
 *               - clave
 *             properties:
 *               usuario:
 *                 type: string
 *               clave:
 *                 type: string
 *     responses:
 *       '302':
 *         description: Redirige a /admin si las credenciales son correctas, o a /login?error=1 si no
 */
router.post('/autenticar', autenticar)

/**
 * @swagger
 * /cerrar-sesion:
 *   get:
 *     summary: Cierra la sesión activa
 *     tags:
 *       - Autenticación
 *     responses:
 *       '302':
 *         description: Borra la cookie y redirige a /login
 */
router.get('/cerrar-sesion', cerrarSesion)

export default router