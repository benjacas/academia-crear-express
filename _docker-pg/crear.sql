-- Estructura y datos reales de la Escuela de Danzas CREAR
-- Ejecutar con: psql -U postgres -d crear -f crear.sql

CREATE TABLE clases (
    id          SERIAL PRIMARY KEY,
    nombre      VARCHAR(100)   NOT NULL,
    descripcion TEXT,
    nivel       VARCHAR(50),
    imagen      TEXT
);
 
CREATE TABLE horarios (
    id       SERIAL PRIMARY KEY,
    horario  VARCHAR(50) NOT NULL,
    id_clase INTEGER,
    FOREIGN KEY (id_clase) REFERENCES clases(id) ON DELETE CASCADE
);
 
INSERT INTO clases (nombre, descripcion, nivel, imagen) VALUES
(
    'Iniciación a la Danza (2 a 6 años)',
    'Primeros pasos en la danza con juegos y exploración de movimiento.',
    'Inicial',
    './recursos/imagenes/babys_clases.webp'
),
(
    'Iniciación a la Danza (7 a 10 años)',
    'Profundización en técnica clásica y jazz, combinando creatividad con disciplina corporal.',
    'Intermedio',
    './recursos/imagenes/medianas1_clases.webp'
),
(
    'Danza Clásica',
    'Formación técnica con trabajo en barra, puntas y creación coreográfica.',
    'Avanzado',
    './recursos/imagenes/clasico_clases.webp'
),
(
    'Danza Jazz',
    'Entrenamiento expresivo y energético que fusiona técnica, ritmo y creatividad.',
    'Avanzado',
    './recursos/imagenes/jazz_clases.webp'
),
(
    'Danza Española',
    'Uso de castañuelas, mantón y abanico. Se trabaja fuerza, presencia y ritmo.',
    'Avanzado',
    './recursos/imagenes/español_clases.webp'
),
(
    'Tap (Zapateo Americano)',
    'Técnica rítmica que combina música y movimiento con el sonido del zapateo.',
    'Avanzado',
    './recursos/imagenes/tap_clases.webp'
),
(
    'Ritmos Urbanos y Latinos (Inicial)',
    'Un espacio pensado para quienes dan sus primeros pasos en los ritmos urbanos y latinos. A través del juego, la coordinación y el ritmo, los alumnos aprenden las bases del hip hop, reggaetón y salsa, descubriendo el movimiento desde la energía y la diversión.',
    'Inicial',
    './recursos/imagenes/hiphop_clases.webp'
),
(
    'Ritmos Urbanos y Latinos (Intermedio)',
    'Una propuesta para quienes ya tienen experiencia y buscan seguir evolucionando en distintos estilos urbanos y latinos. Se trabaja sobre técnica, precisión rítmica y composición coreográfica, explorando estilos como hip hop, comercial pop, bachata y salsa.',
    'Intermedio',
    './recursos/imagenes/latino_clases.webp'
);
 
CREATE TABLE contactos (
    id       SERIAL PRIMARY KEY,
    nombre   VARCHAR(100) NOT NULL,
    email    VARCHAR(100) NOT NULL,
    telefono VARCHAR(50),
    clase    VARCHAR(100),
    mensaje  TEXT         NOT NULL,
    fecha    TIMESTAMP    DEFAULT NOW()
);

-- Iniciación a la Danza (2 a 6 años) → id 1
INSERT INTO horarios (horario, id_clase) VALUES
('Martes y Jueves - 18:00 a 19:00', 1);
 
-- Iniciación a la Danza (7 a 10 años) → id 2
INSERT INTO horarios (horario, id_clase) VALUES
('Martes y Jueves - 19:00 a 20:00', 2);
 
-- Danza Clásica → id 3
INSERT INTO horarios (horario, id_clase) VALUES
('Lunes - 19:00 a 20:00', 3),
('Miércoles - 17:00 a 18:00', 3);
 
-- Danza Jazz → id 4
INSERT INTO horarios (horario, id_clase) VALUES
('Miércoles - 18:00 a 19:00', 4),
('Miércoles - 19:00 a 20:00', 4);
 
-- Danza Española → id 5
INSERT INTO horarios (horario, id_clase) VALUES
('Lunes - 18:00 a 19:00', 5);
 
-- Tap → id 6
INSERT INTO horarios (horario, id_clase) VALUES
('Lunes - 17:00 a 18:00', 6);
 
-- Ritmos Urbanos y Latinos Inicial → id 7
INSERT INTO horarios (horario, id_clase) VALUES
('Martes y Jueves - 20:00 a 21:00', 7);
 
-- Ritmos Urbanos y Latinos Intermedio → id 8
INSERT INTO horarios (horario, id_clase) VALUES
('Lunes y Miércoles - 20:00 a 21:00', 8);