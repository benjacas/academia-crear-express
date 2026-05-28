import { Router } from 'express'
import {
  obtenerClases,
  obtenerClasesPorNivel,
  obtenerClasePorId,
  crearClase,
  actualizarClase,
  eliminarClase,
} from './controlador.clases.mjs'

const router = Router()

router.get('/',               obtenerClases)
router.get('/nivel/:nivel',   obtenerClasesPorNivel)
router.get('/:id',            obtenerClasePorId)
router.post('/',              crearClase)
router.put('/:id',            actualizarClase)
router.delete('/:id',         eliminarClase)

export default router
