import ClasesModelo from './modelo.clases.mjs'

// LECTURA 1 — GET /api/clases
export async function obtenerClases(req, res) {
  try {
    const clases = await ClasesModelo.obtenerTodas()
    res.json(clases)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// LECTURA 2 — GET /api/clases/:id
export async function obtenerClasePorId(req, res) {
  try {
    const clase = await ClasesModelo.obtenerPorId(req.params.id)
    if (!clase) {
      return res.status(404).json({ error: `No se encontro la clase con id ${req.params.id}` })
    }
    res.json(clase)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// ALTA — POST /api/clases
export async function crearClase (req, res) {
  try {
    const { nombre, descripcion, nivel } = req.body
    if (!nombre) {
      return res.status(400).json({ error: 'nombre es obligatorio' })
    }
    const nuevo = await ClasesModelo.crearClase({ nombre, descripcion, nivel })
    res.status(201).json(nuevo)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// MODIFICACION — PUT /api/clases/:id
export async function actualizarClase(req, res) {
  try {
    const existe = await ClasesModelo.obtenerPorId(req.params.id)
    if (!existe) {
      return res.status(404).json({ error: `No se encontro la clase con id ${req.params.id}` })
    }
    const { nombre, descripcion, nivel } = req.body
    const actualizado = await ClasesModelo.actualizarClase(req.params.id, { nombre, descripcion, nivel })
    res.json(actualizado)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// FILTRO — GET /api/clases/nivel/:nivel
export async function obtenerClasesPorNivel(req, res) {
  try {
    const clases = await ClasesModelo.obtenerPorNivel(req.params.nivel)
    res.json(clases)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// BAJA — DELETE /api/clases/:id
export async function eliminarClase(req, res) {
  try {
    const eliminado = await ClasesModelo.eliminarClase(req.params.id)
    if (!eliminado) {
      return res.status(404).json({ error: `No se encontro la clase con id ${req.params.id}` })
    }
    res.json({ mensaje: 'Clase eliminada correctamente', clase: eliminado })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}