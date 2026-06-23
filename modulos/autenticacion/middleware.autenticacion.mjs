import jwt from 'jsonwebtoken'
import 'dotenv/config'

export function verificarSesion(req, res, next) {
  const token = req.signedCookies['token']

  if (!token) {
    const esApi = req.originalUrl.startsWith('/api/')
    if (esApi) return res.status(401).json({ error: 'No autorizado' })
    return res.redirect('/login')
  }

  // Verificamos la firma y la expiración del JWT
  jwt.verify(token, process.env.JWT_FIRMA, (error, decoded) => {
    if (error) {
      // El token expiró o fue manipulado
      const esApi = req.originalUrl.startsWith('/api/')
      if (esApi) return res.status(401).json({ error: 'Token inválido o expirado' })
      return res.redirect('/login')
    }

    // Token válido — guardamos los datos del usuario en req para usarlos después
    req.usuario = decoded
    next()
  })
}