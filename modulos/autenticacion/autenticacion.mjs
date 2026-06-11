import 'dotenv/config'

// POST /autenticar — recibe usuario y clave desde el formulario de login
export async function autenticar(req, res) {

  const { usuario, clave } = req.body

  // Leemos las credenciales desde .env, nunca hardcodeadas en el código
  const usuarioCorrecto = process.env.ADMIN_USUARIO
  const claveCorrecto   = process.env.ADMIN_CLAVE


  if (usuario !== usuarioCorrecto || clave !== claveCorrecto) {
    return res.redirect('/login?error=1')
  }


  // Si no coinciden, redirigimos al login con parámetro de error
  if (usuario !== usuarioCorrecto || clave !== claveCorrecto) {
    return res.redirect('/login?error=1')
  }

  // Credenciales correctas → creamos la cookie firmada
  res.cookie('sesion', 'identificador', {
    httpOnly: true,  // no accesible desde JS del navegador
    signed:   true,  // firmada con COOKIE_SECRETO del .env
    sameSite: 'lax',
    secure:   process.env.NODE_ENV === 'production', // solo HTTPS en producción
    maxAge:   1000 * 60 * 60 * 2, // 2 horas
  })

  res.redirect('/admin')
}

// GET /cerrar-sesion — borra la cookie y vuelve al login
export function cerrarSesion(req, res) {
  res.clearCookie('sesion')
  res.redirect('/login')
}