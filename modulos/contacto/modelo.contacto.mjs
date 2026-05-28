import pool from '../../conexiones/bd/conexion.bd.mjs'

const guardarContacto = async ({ nombre, email, telefono, clase, mensaje }) => {
  const resultado = await pool.query(
    `INSERT INTO contactos (nombre, email, telefono, clase, mensaje)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [nombre, email, telefono || null, clase || null, mensaje]
  )
  return resultado.rows[0]
}

export default { guardarContacto }
