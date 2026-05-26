const form = document.getElementById('formContacto')
const btn  = document.getElementById('btnEnviar')
const fb   = document.getElementById('feedback-contacto')

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const body = {
    name:     form.name.value.trim(),
    email:    form.email.value.trim(),
    telefono: form.telefono.value.trim(),
    clases:   form.clases.value,
    mensaje:  form.mensaje.value.trim(),
  }

  btn.disabled    = true
  btn.textContent = 'Enviando...'

  try {
    const res  = await fetch('/api/contacto', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error)

    fb.textContent  = data.mensaje
    fb.className    = 'ok'
    form.reset()
  } catch (err) {
    fb.textContent = err.message || 'Hubo un error al enviar el mensaje.'
    fb.className   = 'error'
  } finally {
    btn.disabled    = false
    btn.textContent = 'Enviar mensaje'
  }
})
