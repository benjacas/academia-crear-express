import pool from '../../conexiones/bd/conexion.bd.mjs';

// Obtener todas las clases
const obtenerTodas = async () => {
  const resultado = await pool.query(`
    SELECT c.*,
           ARRAY_REMOVE(ARRAY_AGG(h.horario ORDER BY h.id), NULL) AS horarios
    FROM clases c
    LEFT JOIN horarios h ON h.id_clase = c.id
    GROUP BY c.id
    ORDER BY c.id ASC
  `)
  return resultado.rows
}

// Obtener una clase por ID
const obtenerPorId = async (id) => {
  const resultado = await pool.query(
    `SELECT c.*,
            ARRAY_REMOVE(ARRAY_AGG(h.horario ORDER BY h.id), NULL) AS horarios
     FROM clases c
     LEFT JOIN horarios h ON h.id_clase = c.id
     WHERE c.id = $1
     GROUP BY c.id`,
    [id]
  )
  return resultado.rows[0]
}

// Crear una nueva clase
const crearClase = async ({ nombre, descripcion, nivel, imagen }) => {
  const resultado = await pool.query(
    `INSERT INTO clases (nombre, descripcion, nivel, imagen)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [nombre, descripcion, nivel, imagen || null]
  )
  return resultado.rows[0]
}

// Actualizar una clase existente
const actualizarClase = async (id, { nombre, descripcion, nivel, imagen }) => {
  const resultado = await pool.query(
    `UPDATE clases
     SET nombre = $1, descripcion = $2, nivel = $3, imagen = $4
     WHERE id = $5
     RETURNING *`,
    [nombre, descripcion, nivel, imagen, id]
  )
  return resultado.rows[0]
}

// Eliminar una clase
const eliminarClase = async (id) => {
  const resultado = await pool.query(
    'DELETE FROM clases WHERE id = $1 RETURNING *',
    [id]
  )
  return resultado.rows[0]
}

// Obtener clases filtradas por nivel
const obtenerPorNivel = async (nivel) => {
  const resultado = await pool.query(
    'SELECT * FROM clases WHERE LOWER(nivel) = LOWER($1) ORDER BY id ASC',
    [nivel]
  )
  return resultado.rows
}

const reemplazarHorarios = async (idClase, horarios) => {
  // Borra los horarios anteriores de esa clase
  await pool.query('DELETE FROM horarios WHERE id_clase = $1', [idClase])

  // Inserta cada horario nuevo
  for (const horario of horarios) {
    await pool.query(
      'INSERT INTO horarios (horario, id_clase) VALUES ($1, $2)',
      [horario.trim(), idClase]
    )
  }
}

export default { obtenerTodas, obtenerPorId, crearClase, actualizarClase, eliminarClase, obtenerPorNivel, reemplazarHorarios}