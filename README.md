# APIGrupalTeclab
Esta es una API que desarrollaremos en grupo entre alumnos de teclab, como contenido extracurricular de la materia "Integraciones Web".


## Para instalar las dependencias

Al clonar el repositorio se ejecuta el siguiente comando que instalará todas las dependencias.

```bash
npm install
```

Una vez descargado e instalado las dependencias se debe crear un archivo a nivel raiz del proyecto, de nombre ".env" que contenga la siguiente estructura a rellenar:

```bash
PORT=
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
DB_PORT=
# Auth
SECRET_KEY=
```

Deberan completarla con el puerto que quieren utilizar para ejecutar la api y por el cual estará recibiendo las peticiones, y los demás son los datos de su base de datos MySQL local, o remota, dependiendo que vayan a usar. En mi caso tengo esta estructura 3 veces porque estuve probando 3 bases de datos a la vez, pero ustedes seguramente usen una.

Luego de haber configurado el archivo .env, deben copiar todo el código SQL, que esta en la carpeta SQL de nombre "colegio_tablas.sql" con la estructura de la base de datos, en su base de datos para que se creen las tablas y el contenido.

---

## Ejecución:

Se recomiendo usar nodemon para hacer las pruebas, se puede instalar usando el siguiente comando:

```bash
npm install -g nodemon
```

### Para ejecutar el server con Express (teniendo nodemon)

```bash
 npm run dev
```


### Para ejecutar el server con Express (sin nodemon)

```bash
 npm run start
```

---

Pueden comenzar las pruebas chckeando las estructuras de los datos en cada endpoint:

/materias
/alumnos
/profesores
/notas

---

<em><b>¡Espero que nuestro proyecto te haya resultado de interés!,  saludos..</b></em>