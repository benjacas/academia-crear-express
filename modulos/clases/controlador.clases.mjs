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
    const { nombre, descripcion, nivel } = req.body

    if (!nombre) {
      return res.status(400).json({ error: 'nombre es obligatorio' })
    }

    let imagen

    if (req.file) {
      imagen = `/recursos/imagenes/${req.file.filename}`
    } else {
      imagen = null
    }

    //  se crea la clase para obtener el id
    const nuevo = await ClasesModelo.crearClase({ nombre, descripcion, nivel, imagen })

    // nuevo.id para asociar los horarios
    if (req.body.horarios) {
      const listaHorarios = req.body.horarios.split(',')
      await ClasesModelo.reemplazarHorarios(nuevo.id, listaHorarios)
    }

    res.status(201).json(nuevo)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// MODIFICACION — PUT /api/clases/:id
export async function actualizarClase(req, res) {
  try {
    const id = Number(req.params.id)
    if (!id) {
      return res.status(400).json({ error: 'El id debe ser un número entero' })
    }

    const existe = await ClasesModelo.obtenerPorId(id)
    if (!existe) {
      return res.status(404).json({ error: `No se encontro la clase con id ${id}` })
    }

    const { nombre, descripcion, nivel } = req.body

    let imagen

    if (req.file) {
      imagen = `/recursos/imagenes/${req.file.filename}`
    } else {
      imagen = existe.imagen
    }

    // Actualiza los datos de la clase
    const actualizado = await ClasesModelo.actualizarClase(id, {
      nombre:      nombre      || existe.nombre,
      descripcion: descripcion || existe.descripcion,
      nivel:       nivel       || existe.nivel,
      imagen,
    })

    // Si se actualizan los horarios los separamos por coma y reemplaza los anteriores
    if (req.body.horarios) {
      const listaHorarios = req.body.horarios.split(',')
      await ClasesModelo.reemplazarHorarios(id, listaHorarios)
    }

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