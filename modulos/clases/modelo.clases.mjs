import pool from '../../conexiones/bd/conexion.bd.mjs';

// Obtener todas las clases
const obtenerTodas = async () => {
  const resultado = await pool.query('SELECT * FROM clases ORDER BY id ASC')
  return resultado.rows
}

// Obtener una clase por ID
const obtenerPorId = async (id) => {
  const resultado = await pool.query(
    'SELECT * FROM clases WHERE id = $1',
    [id]
  )
  return resultado.rows[0]
}

// Crear una nueva clase
const crearClase = async ({ nombre, descripcion, nivel }) => {
  const resultado = await pool.query(
    `INSERT INTO clases (nombre, descripcion, nivel)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [nombre, descripcion, nivel]
  )
  return resultado.rows[0]
}

// Actualizar una clase existente
const actualizarClase = async (id, { nombre, descripcion, nivel }) => {
  const resultado = await pool.query(
    `UPDATE clases
     SET nombre = $1, descripcion = $2, nivel = $3
     WHERE id = $4
     RETURNING *`,
    [nombre, descripcion, nivel, id]
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

export default { obtenerTodas, obtenerPorId, crearClase, actualizarClase, eliminarClase, obtenerPorNivel }