/*
    @authors:          Gustavo, Mateo 
    @modifications:    Juan
    Last change:       06/07/2023  by  Juan
*/


-- Tablas independientes

CREATE TABLE cuatrimestres (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(255) NOT NULL
);

CREATE TABLE materias (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(255) NOT NULL
);

CREATE TABLE roles (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR (255) NOT NULL
);

CREATE TABLE cursos (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(255) NOT NULL
);

-- Tablas con relaciones

CREATE TABLE usuarios(
id INT AUTO_INCREMENT PRIMARY KEY,
nombre_usuario VARCHAR(30) NOT NULL,
contrasenia VARCHAR(100) NOT NULL,
rol INT NOT NULL,
foreign key(rol) references roles(id)
);

CREATE TABLE alumnos (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(55) NOT NULL,
apellido VARCHAR(55) NOT NULL,
dni VARCHAR(9) NOT NULL,
curso INT NULL,
usuario_relacionado INT(100) NULL,
foreign key (curso) references cursos(id),
foreign key (usuario_relacionado) references usuarios(id)
);

CREATE TABLE profesores(
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(55) NOT NULL,
apellido VARCHAR(55) NOT NULL,
dni VARCHAR(9) NOT NULL,
materia INT NOT NULL,
usuario_relacionado INT(100) NULL,
foreign key(materia) references materias(id),
foreign key (usuario_relacionado) references usuarios(id)
);

CREATE TABLE secretarias(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre VARCHAR(55) NOT NULL,
    apellido VARCHAR(55) NOT NULL,
    dni VARCHAR(9) NOT NULL,
    usuario_relacionado INT(100) NULL,
    foreign key (usuario_relacionado) references usuarios(id)
);

CREATE TABLE administradores(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre VARCHAR(55) NOT NULL,
    apellido VARCHAR(55) NOT NULL,
    dni VARCHAR(9) NOT NULL,
    usuario_relacionado INT(100) NULL,
    foreign key (usuario_relacionado) references usuarios(id)
);

CREATE TABLE materias_alumnos(
id_alumno_materia INT AUTO_INCREMENT PRIMARY KEY,
alumno INT NOT NULL,
materia INT NOT NULL,
foreign key (alumno) references alumnos(id),
foreign key (materia) references materias(id)
);

CREATE TABLE notas (
id INT AUTO_INCREMENT PRIMARY KEY,
año VARCHAR(5) NOT NULL,
nota float NOT NULL,
profesor INT NOT NULL,
alumno INT NOT NULL,
cuatrimestre INT NOT NULL,
materia INT NOT NULL,
curso INT NOT NULL,
foreign key (profesor) references profesores(id),
foreign key (alumno) references alumnos(id),
foreign key(cuatrimestre) references cuatrimestres(id),
foreign key(materia) references materias(id),
foreign key(curso) references cursos(id)
);

-- ==== Inserciones ====

-- Inserciones a tablas sin relación

INSERT INTO cursos VALUES
(default,'Primero A'),
(default,'Segundo A' ),
(default,'Tercero A'),
(default,'Cuarto A'),
(default,'QuINTo A');

INSERT INTO materias VALUES
(default,'Matematicas'),
(default,'Ingles' ),
(default,'Quimica'),
(default,'Fisica'),
(default,'Música'),
(default,'Historia'),
(default,'Biología');

INSERT INTO roles VALUES
(default,'Administrador'),
(default,'Secretaria' ),
(default,'Profesor');

INSERT INTO cuatrimestres VALUES
(default,'Primer Cuatrimestre'),
(default,'Segundo Cuatrimestre');

-- Inserciones a tablas con relaciones

INSERT INTO profesores VALUES
(default, 'Juan', 'Perez', '123456789', 1, null),
(default, 'Pedro', 'Gomez', '987654321', 2, null),
(default, 'Juana', 'Fernandez', '246813579', 3, null),
(default, 'Lucía', 'Galán', '135792468', 4, null),
(default, 'Julio', 'Iglesias', '864209753', 5, null),
(default, 'Teresa', 'Gutierrez', '357924680', 6, null),
(default, 'Alberto', 'Gonzalez', '802468135', 7, null);

INSERT INTO alumnos VALUES
(default, 'Carolina', 'Marquesin', '123456789', 1, null),
(default, 'Juan', 'Ruarte', '987654321', 1, null),
(default, 'Matias', 'Carrizo', '246813579', 1, null),
(default, 'Hernan', 'Redondo', '135792468', 1, null),
(default, 'Waldo', 'Velasquez', '864209753', 1, null),
(default, 'Sergio', 'Armas', '357924680', 2, null),
(default, 'Miguel', 'Juarez', '802468135', 2, null),
(default, 'Lucas', 'Fiore', '123456789', 2, null),
(default, 'Adriana', 'Gonzalez', '987654321', 2, null),
(default, 'Vanesa', 'Veron', '246813579', 2, null),
(default, 'Maria', 'Duarte', '135792468', 2, null),
(default, 'Maira', 'Narvaez', '864209753', 3, null),
(default, 'Teresa', 'Guillen', '357924680', 3, null),
(default, 'Martin', 'San', '802468135', 3, null),
(default, 'Nestor', 'Gomez', '123456789', 3, null),
(default, 'Cabrera', 'Gavilan', '987654321', 3, null),
(default, 'Enrique', 'Kracher', '246813579', 3, null),
(default, 'Miguel', 'Barrios', '135792468', 4, null),
(default, 'Sandra', 'Romero', '864209753', 4, null),
(default, 'Micaela', 'Michela', '357924680', 4, null),
(default, 'Carlos', 'Gonzalez', '802468135', 4, null),
(default, 'Oscar', 'Carvajal', '123456789', 4, null),
(default, 'Luciano', 'Dugour', '987654321', 4, null),
(default, 'CINTia', 'Insaurralde', '246813579', 5, null),
(default, 'Javier', 'Dauo', '135792468', 5, null),
(default, 'Rossi', 'Planes', '864209753', 5, null),
(default, 'Gustavo', 'Schamne', '357924680', 5, null),
(default, 'Gustavo', 'Benitez', '802468135', 5, null),
(default, 'Elizabeth', 'Beron', '123456789', 5, null);

INSERT INTO usuarios VALUES
(default, 'LeoMessirve', '', 1),
(default, 'Bradsadito', '', 1),
(default, 'soylaviuda', '', 2),
(default, 'AleDadd', '', 2),
(default, 'zaz88', '', 2);

INSERT INTO secretarias VALUES
(default, 'Scarlet', 'Johansson', 123123132, 3),
(default, 'Alexandra', 'Daddario', 120606900, 4),
(default, 'Zazie', 'Beetz', 648132697, 5);

INSERT INTO administradores VALUES
(default, 'Brad', 'Pitt', 100200300, 2),
(default, 'Leonel', 'Messi', 100100100, 1);

INSERT INTO materias_alumnos VALUES
(default,1,1),
(default,1,2),
(default,1,3),
(default,1,4),
(default,1,5),
(default,1,6),
(default,1,7),
(default,2,1),
(default,2,2),
(default,2,3),
(default,2,4),
(default,2,5),
(default,2,6),
(default,2,7),
(default,3,1),
(default,3,2),
(default,3,3),
(default,3,4),
(default,3,5),
(default,3,6),
(default,3,7),
(default,4,1),
(default,4,2),
(default,4,3),
(default,4,4),
(default,4,5),
(default,4,6),
(default,4,7),
(default,5,1),
(default,5,2),
(default,5,3),
(default,5,4),
(default,5,5),
(default,5,6),
(default,5,7),
(default,6,1),
(default,6,2),
(default,6,3),
(default,6,4),
(default,6,5),
(default,6,6),
(default,6,7),
(default,7,1),
(default,7,2),
(default,7,3),
(default,7,4),
(default,7,5),
(default,7,6),
(default,7,7),
(default,8,1),
(default,8,2),
(default,8,3),
(default,8,4),
(default,8,5),
(default,8,6),
(default,8,7),
(default,9,1),
(default,9,2),
(default,9,3),
(default,9,4),
(default,9,5),
(default,9,6),
(default,9,7),
(default,10,1),
(default,10,2),
(default,10,3),
(default,10,4),
(default,10,5),
(default,10,6),
(default,10,7),
(default,11,1),
(default,11,2),
(default,11,3),
(default,11,4),
(default,11,5),
(default,11,6),
(default,11,7),
(default,12,1),
(default,12,2),
(default,12,3),
(default,12,4),
(default,12,5),
(default,12,6),
(default,12,7),
(default,13,1),
(default,13,2),
(default,13,3),
(default,13,4),
(default,13,5),
(default,13,6),
(default,13,7),
(default,14,1),
(default,14,2),
(default,14,3),
(default,14,4),
(default,14,5),
(default,14,6),
(default,14,7),
(default,15,1),
(default,15,2),
(default,15,3),
(default,15,4),
(default,15,5),
(default,15,6),
(default,15,7),
(default,16,1),
(default,16,2),
(default,16,3),
(default,16,4),
(default,16,5),
(default,16,6),
(default,16,7),
(default,17,1),
(default,17,2),
(default,17,3),
(default,17,4),
(default,17,5),
(default,17,6),
(default,17,7),
(default,18,1),
(default,18,2),
(default,18,3),
(default,18,4),
(default,18,5),
(default,18,6),
(default,18,7),
(default,19,1),
(default,19,2),
(default,19,3),
(default,19,4),
(default,19,5),
(default,19,6),
(default,19,7),
(default,20,1),
(default,20,2),
(default,20,3),
(default,20,4),
(default,20,5),
(default,20,6),
(default,20,7),
(default,21,1),
(default,21,2),
(default,21,3),
(default,21,4),
(default,21,5),
(default,21,6),
(default,21,7),
(default,22,1),
(default,22,2),
(default,22,3),
(default,22,4),
(default,22,5),
(default,22,6),
(default,22,7),
(default,23,1),
(default,23,2),
(default,23,3),
(default,23,4),
(default,23,5),
(default,23,6),
(default,23,7),
(default,24,1),
(default,24,2),
(default,24,3),
(default,24,4),
(default,24,5),
(default,24,6),
(default,24,7),
(default,25,1),
(default,25,2),
(default,25,3),
(default,25,4),
(default,25,5),
(default,25,6),
(default,25,7),
(default,26,1),
(default,26,2),
(default,26,3),
(default,26,4),
(default,26,5),
(default,26,6),
(default,26,7),
(default,27,1),
(default,27,2),
(default,27,3),
(default,27,4),
(default,27,5),
(default,27,6),
(default,27,7),
(default,28,1),
(default,28,2),
(default,28,3),
(default,28,4),
(default,28,5),
(default,28,6),
(default,28,7),
(default,29,1),
(default,29,2),
(default,29,3),
(default,29,4),
(default,29,5),
(default,29,6),
(default,29,7);


