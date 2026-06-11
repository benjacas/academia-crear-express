// Middleware guardián: verifica que haya sesión válida antes de dejar pasar

export function verificarSesion(req, res, next) {

  // signedCookies viene de cookie-parser
  // si la cookie fue manipulada, devuelve false automáticamente
  const sesion = req.signedCookies['sesion']

  if (sesion === 'identificador') {
    return next() // sesión válida, seguimos
  }

  // Sin sesión: si es llamada de API respondemos 401, si es navegador redirigimos
  const esApi = req.path.startsWith('/api/')

  if (esApi) {
    return res.status(401).json({ error: 'No autorizado' })
  }

  return res.redirect('/login')
}