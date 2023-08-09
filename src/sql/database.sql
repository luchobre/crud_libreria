-- Crear la base de datos "libreria"
CREATE DATABASE crud_libreria;
-- Usar la base de datos "libreria"
USE crud_libreria;

-- Crear la tabla "socios"
CREATE TABLE socios (
    id_socio INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    fecha_nac DATE,
    dni VARCHAR(50),
    direccion VARCHAR(50),
    telefono VARCHAR(50),
    email VARCHAR(50),
    fecha_alta DATE
);

CREATE TABLE libros (
    id_libro INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    isbn CHAR(17) UNIQUE      DEFAULT '',
    titulo VARCHAR(50),
    reseña VARCHAR(200),
    autor VARCHAR(100)  DEFAULT 'No disponible',
    editorial VARCHAR(30)   DEFAULT 'No disponible',
    anio YEAR
);

CREATE TABLE prestamos (
    id_prestamo INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_libro INT,
    id_socio INT,
    fecha_retiro DATETIME,
    fecha_entrega DATETIME
);



-- Mostrar la descripción de la tabla "socios"
DESCRIBE socios;

-- Mostrar la descripción de la tabla "libros"
DESCRIBE libros;

-- Mostrar la descripción de la tabla "prestamos"
DESCRIBE prestamos;



-- INSERT INTO socios (nombre, apellido, fecha_nac, dni, direccion, telefono, email, fecha_alta) VALUES ('Luciano', 'Lopez', '1992-08-25', '36824526', 'camacua 3496','1158914320', 'lucho.bregoli@gmail.com', '2023-08-08');


-- Mostrar todos los registros de la tabla "socios"
SELECT * FROM socios;
