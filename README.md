# Escuela de Danzas CREAR — Backend (Express)

Sitio web institucional con backend REST para la Escuela de Danzas CREAR. Incluye panel de administración de clases y formulario de contacto.

---

## Tecnologías

- Node.js + Express.js
- PostgreSQL (vía Docker)
- pnpm
- Swagger (documentación de la API)

---

## Estructura del proyecto
/
├── front/ → Sitio web (HTML, CSS, JS)
├── modulos/
│ ├── clases/ → Rutas, controlador y modelo de clases
│ └── contacto/ → Rutas, controlador y modelo de contacto
├── conexiones/bd/ → Conexión a PostgreSQL
├── _docker-pg/ → Dockerfile y SQL de la base de datos
├── swagger.mjs → Configuración de Swagger
└── index.mjs → Entrada del servidor


---

## Requisitos

- Node.js v18 o superior
- pnpm
- Docker

---

## Instalación y puesta en marcha

### 1. Clonar el repositorio
git clone https://github.com/mbordon1/academia-crear-express.git
cd academia-crear-express


### 2. Instalar dependencias
pnpm install


### 3. Configurar las variables de entorno
```bash
cp .env.example .env
```

Completa el archivo `.env` con tus valores locales.

### 4. Levantar la base de datos con Docker
El contenedor toma la configuracion desde el archivo local `.env`:

```bash
docker build -t crear-db ./_docker-pg
docker run -d --name crear-postgres -p 5433:5432 --env-file .env crear-db
```


Si el contenedor ya existe, solo inicialo:

```bash
docker start crear-postgres
```


### 5. Levantar el servidor
```bash
pnpm run dev
```


Documentación de la API (Swagger):
http://localhost:2026/api-docs


---

## Endpoints

### Clases

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/clases | Obtener todas las clases |
| GET | /api/clases/:id | Obtener una clase por ID |
| GET | /api/clases/nivel/:nivel | Filtrar clases por nivel |
| POST | /api/clases | Crear una clase |
| PUT | /api/clases/:id | Actualizar una clase |
| DELETE | /api/clases/:id | Eliminar una clase |

### Contacto

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /api/contacto | Guardar mensaje de contacto |

---

## Panel de administración

Disponible en:
http://localhost:2026/admin.html

