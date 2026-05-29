import ClasesModelo from './modelo.clases.mjs'

// LECTURA 1 — GET /api/clases
export async function obtenerClases(req, res) {
  try {
    const clases = await ClasesModelo.obtenerTodas()
    res.json(clases)
  } catch (error) {
    res.status(500).json({ error: error.message })
    console.error('ERROR CLASES:', error)
  }
}

// LECTURA 2 — GET /api/clases/:id
export async function obtenerClasePorId(req, res) {
  try {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
      return res.status(400).json({ error: 'El id debe ser un número entero' })
    }
    const clase = await ClasesModelo.obtenerPorId(id)
    if (!clase) {
      return res.status(404).json({ error: `No se encontro la clase con id ${id}` })
    }
    res.json(clase)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// ALTA — POST /api/clases
export async function crearClase(req, res) {
  try {
    const { nombre, descripcion, nivel, imagen } = req.body
    if (!nombre) {
      return res.status(400).json({ error: 'nombre es obligatorio' })
    }
    const nuevo = await ClasesModelo.crearClase({ nombre, descripcion, nivel, imagen })
    res.status(201).json(nuevo)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// MODIFICACION — PUT /api/clases/:id
export async function actualizarClase(req, res) {
  try {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
      return res.status(400).json({ error: 'El id debe ser un número entero' })
    }
    const existe = await ClasesModelo.obtenerPorId(id)
    if (!existe) {
      return res.status(404).json({ error: `No se encontro la clase con id ${id}` })
    }
    const { nombre, descripcion, nivel, imagen } = req.body
    const actualizado = await ClasesModelo.actualizarClase(id, {
      nombre:      nombre      !== undefined ? nombre      : existe.nombre,
      descripcion: descripcion !== undefined ? descripcion : existe.descripcion,
      nivel:       nivel       !== undefined ? nivel       : existe.nivel,
      imagen:      imagen      !== undefined ? imagen      : existe.imagen,
    })
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
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
      return res.status(400).json({ error: 'El id debe ser un número entero' })
    }
    const clase = await ClasesModelo.obtenerPorId(id)
    if (!clase) {
      return res.status(404).json({ error: `No se encontro la clase con id ${id}` })
    }
    const eliminado = await ClasesModelo.eliminarClase(id)
    res.json({ mensaje: 'Clase eliminada correctamente', clase: eliminado })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}