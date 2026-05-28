import { Router } from 'express'
import { recibirContacto } from './controlador.contacto.mjs'

const router = Router()

router.post('/', recibirContacto)

export default router
