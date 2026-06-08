import { Router } from 'express'
import { autenticar, cerrarSesion } from './autenticacion.mjs'

const router = Router()

router.post('/autenticar', autenticar)
router.get('/cerrar-sesion', cerrarSesion)

export default router