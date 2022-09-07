const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
/* const expressFileUpload = require("express-fileupload"); */
const exphbs = require("express-handlebars");
const { listarCiudades, listarComunas, obtenerUsuarioPorId, obtenercomunaPorId, obtenerCiudadPorId } = require("./src/services/db.service");
const { postLoginUsuario } = require("./src/controllers/usuarios.controllers");
const { rutasUsuario } = require("./src/routes/usuarios.routes");
const { cookieRutaProtegida } = require("./src/middlewares/cookie.middlewares");
const { validarToken } = require("./src/services/jwt.service");

const puerto = process.env.PUERTO_SERVIDOR;

// Escuchando el puerto definido en archivo .env
app.listen(puerto, () => console.log("Servidor Funcionando!"));

//Configura el motor de visualización en handlebars.
app.engine(
  "handlebars",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: `${__dirname}/views/layouts`,
  })
);
app.set("view engine", "handlebars");

// Middlewares

// MiddleWare que analiza el cuerpo de la solicitud y lo pone a disposición en la propiedad req.body.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//Sirve los archivos estaticos en la carpeta
app.use(express.static(__dirname + "/assets"));

/* app.use(
    expressFileUpload({
      limits: 5000000, //tamaño limite para la carga de archivo
      abortOnLimit: true, //para que rebote la consulta al momento de superar el limite
      responseOnLimit: "El tamaño de la imagen supera el limite permitido", //mensaje para avisar al usuario
    })
  ); */

//Ruta que está renderizando la vista registro
app.get("/registro", async (req, res) => {
  try {
    const ciudades = await listarCiudades();
    const comunas = await listarComunas();
    res.render("registro", { ciudades, comunas });
  } catch (error) {
    return res.status(500).send({
      error: `Algo salio mal...${error}`,
      code: 500,
    });
  }
});

//Ruta que se utiliza para inicar sesión
app.post("/acceso", postLoginUsuario);

//Ruta que renderiza la vista login
app.get("/", (req, res) => {
  res.render("login");
});

//Ruta que se le pasa un middleware para proteger vistas.
app.get("/home", cookieRutaProtegida, async (req, res) => {
  const { data } = validarToken(req.cookies.moonToken);
  const usuario = await obtenerUsuarioPorId(data);
  const { contrasenia: contra, ...restUsuario } = usuario;
  if(usuario.es_admin){
    res.render("admin", { restUsuario });
  }
  if(!usuario.es_admin){
    const comuna = await obtenercomunaPorId(usuario.id_comuna);
    const ciudad = await obtenerCiudadPorId(comuna.id_region);
    const ciudades = await listarCiudades();
    const comunas = await listarComunas();
    res.render("perfil", { restUsuario, comuna, ciudad, ciudades, comunas});
  }
});

//Middleware que está usando la ruta /usuario y la ruta rutasUsuario.
app.use("/usuario", rutasUsuario);
