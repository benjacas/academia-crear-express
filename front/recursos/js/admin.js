const API = '/api/clases'
const $   = id => document.getElementById(id)

function msg(texto, tipo = 'ok') {
  const el = $('feedback')
  el.textContent = texto
  el.className   = tipo
  setTimeout(() => { el.textContent = ''; el.className = '' }, 3000)
}

// ── Listar ────────────────────────────────────────────────────
async function cargar() {
  try {
    const res    = await fetch(API)
    const clases = await res.json()
    const tbody  = $('tabla')

    if (!clases.length) {
      tbody.innerHTML = '<tr><td colspan="6" class="tabla-vacia">No hay clases cargadas.</td></tr>'
      return
    }

    tbody.innerHTML = clases.map(c => `
      <tr>
        <td>${c.id}</td>
        <td>${c.nombre}</td>
        <td>${c.nivel ? `<span class="badge badge-${c.nivel}">${c.nivel}</span>` : '—'}</td>
        <td>${c.descripcion ?? ''}</td>
        <td class="acciones">
          <button class="btn-edit"   onclick="editar(${c.id})">Editar</button>
          <button class="btn-delete" onclick="eliminar(${c.id})">Eliminar</button>
        </td>
      </tr>
    `).join('')
  } catch (err) {
    msg('Error al cargar las clases', 'error')
  }
}

// ── Editar ────────────────────────────────────────────────────
async function editar(id) {
  try {
    const res  = await fetch(`${API}/${id}`)
    const data = await res.json()
    if (!res.ok) throw new Error(data.error)

    $('editId').value              = data.id
    $('nombre').value              = data.nombre
    $('nivel').value               = data.nivel ?? ''
    $('descripcion').value         = data.descripcion ?? ''
    $('tituloForm').textContent    = `Editando clase #${data.id}`
    $('btnGuardar').textContent    = 'Actualizar'
    $('btnCancelar').style.display = 'inline-block'
    $('nombre').focus()
  } catch (err) {
    msg(err.message, 'error')
  }
}

// ── Guardar (crear o actualizar) ──────────────────────────────
$('formProducto').addEventListener('submit', async (e) => {
  e.preventDefault()
  const id   = $('editId').value
  const body = {
    nombre:      $('nombre').value.trim(),
    nivel:       $('nivel').value || null,
    descripcion: $('descripcion').value.trim() || null,
  }

  try {
    const res  = await fetch(id ? `${API}/${id}` : API, {
      method:  id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error)
    msg(id ? 'Clase actualizada' : 'Clase creada')
    resetForm()
    cargar()
  } catch (err) {
    msg(err.message, 'error')
  }
})

// ── Eliminar ──────────────────────────────────────────────────
async function eliminar(id) {
  if (!confirm(`¿Eliminar la clase #${id}?`)) return
  try {
    const res  = await fetch(`${API}/${id}`, { method: 'DELETE' })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error)
    msg('Clase eliminada')
    cargar()
  } catch (err) {
    msg(err.message, 'error')
  }
}

// ── Cancelar edicion ──────────────────────────────────────────
$('btnCancelar').addEventListener('click', resetForm)

function resetForm() {
  $('formProducto').reset()
  $('editId').value              = ''
  $('tituloForm').textContent    = 'Nueva clase'
  $('btnGuardar').textContent    = 'Guardar'
  $('btnCancelar').style.display = 'none'
}

// Carga inicial
cargar()
