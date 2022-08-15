# **Proyecto Full Stack JavaScript**

Como objetivo se requiere lograr el desarrollo de una página web que solucione la problemática de permitir a usuarios generar solicitudes para una posterior compra de computadores.  

## Hito 1 - Etapa de ideación y setup

### Contenidos:

1. Se identifican las historias de usuario en base a la necesidad de dar solución a la problemática anteriormente mencionada para un próximo desarrollo, ordenándolas en Trello. 

   - [Trello](https://trello.com/invite/b/8fAxLvq9/a514181df2a1cc534b4db3490fb3e1a3/historias-web-site) - Link a las historias en Trello.
   
2.  Se configura la carpeta del proyecto inicializando [NPM]( https://www.npmjs.com/) y [GIT]( https://git-scm.com/), se instala la librería de [EXPRESS](https://www.npmjs.com/package/express) para la creación del servidor, se instala la librería de [PostgreSQL client for Node.js]( https://www.npmjs.com/package/pg) para establecer la conexión con la base de datos.

      - [Verificar las librerías instaladas por medio de NPM](https://github.com/WardMore/ProyectoFinal/blob/main/package.json)
      - [Conexión con la base de datos mediante PG](https://github.com/WardMore/ProyectoFinal/blob/main/services/db.service.js)

3. Se crea el modelo conceptual estableciendo las entidades identificadas con sus respectivos atributos.

   Se crea el modelo lógico transformando todas las entidades en tablas y se agregan los atributos como columnas en las tablas.

   Se transforman las relaciones tipo N:N en una tabla nueva.

   Por último, se aplican las 3 formas normales, en la 1FN se verifica la atomicidad de los campos y que no haya campos repetidos, en la 2FN se cumple la primera forma    normal y no existen dependencias parciales, en la 3FN se cumple la segunda forma normal y no existen dependencias transitivas, ningún campo depende de un campo que    no sea llave.

   Se crea el modelo físico.

   - [PDF diagrama UML](https://github.com/WardMore/ProyectoFinal/tree/main/UML)
   
4. Se crea un archivo "Dump" para exportar la base de datos y un archivo con extensión “.sql” con los scripts para la creación y población de la base de datos.
   
   - [Migraciones](https://github.com/WardMore/ProyectoFinal/tree/main/script)
 
5. Se crean wireframes con [Figma]( https://www.figma.com/), para dar fluidez al desarrollo HTML, además de dar una primera impresión al cliente.
