import ContactoModelo from './modelo.contacto.mjs'

// POST /api/contacto
export async function recibirContacto(req, res) {
  try {
    const { name, email, telefono, clases, mensaje } = req.body

    if (!name || !email || !mensaje) {
      return res.status(400).json({ error: 'nombre, email y mensaje son obligatorios' })
    }

    await ContactoModelo.guardarContacto({
      nombre:  name,
      email,
      telefono,
      clase:   clases,
      mensaje,
    })

    res.json({ mensaje: '¡Mensaje recibido! Nos pondremos en contacto pronto.' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
