const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { v4: uuidv4 } = require('uuid');
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
/* const expressFileUpload = require("express-fileupload"); */
const exphbs = require("express-handlebars");
const { listarCiudades, listarComunas, obtenerUsuarioPorId, obtenercomunaPorId, obtenerCiudadPorId, listarProcesador, listarPlacaMadre, listarMemoriaRAM, listarTarjetaGrafica, listarTarjetaDeRed, listarUnidadMDos, listarUnidadSSD, listarDiscoDuro, listarGabinete, listarFuenteDePoder, listarVentilador, listarRefrigeracion, listarSistemaOperativo, crearSolicitud, solicitudesPorIdUsuario, solicitudPorIdGlobal, productosPorIDGlobal } = require("./src/services/db.service");
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
    return res.status(500).json({
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

//Ruta que se le pasa un middleware para proteger vistas de administrador y usuario
app.get("/home", cookieRutaProtegida, async (req, res) => {
  
  try {
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
  } catch (error) {
    res.render("login");
  }
});

//Middleware que está usando la ruta /usuario y la ruta rutasUsuario.
app.use("/usuario", rutasUsuario);

/*Ruta que está protegida por un middleware que verifica si el usuario tiene una cookie llamada moonToken, si
no lo tiene, redirige a la página de inicio de sesión, si lo tiene, muestra la vista del formulario para
crear una computadora. */
app.get("/armaTuComputador", cookieRutaProtegida ,async(req, res)=>{
  try {
    if(typeof validarToken(req.cookies.moonToken) == 'undefined'){
      return res.redirect('/');
    }
    const { data } = validarToken(req.cookies.moonToken);
    const usuario = await obtenerUsuarioPorId(data);
    const { contrasenia: contra, ...restUsuario } = usuario;
    const procesador = await listarProcesador();
    const placaMadre = await listarPlacaMadre();
    const memoriaRAM = await listarMemoriaRAM();
    const tarjetaGrafica = await listarTarjetaGrafica();
    const tarjetaDeRed = await listarTarjetaDeRed();
    const unidadMDos = await listarUnidadMDos();
    const unidadSSD = await listarUnidadSSD();
    const discoDuro = await listarDiscoDuro();
    const gabinete = await listarGabinete();
    const fuenteDePoder = await listarFuenteDePoder();
    const ventilador = await listarVentilador();
    const refrigeracion = await listarRefrigeracion();
    const sistemaOperativo = await listarSistemaOperativo();

    res.render("solicitud", { procesador, placaMadre, memoriaRAM, tarjetaGrafica, tarjetaDeRed, unidadMDos, unidadSSD, discoDuro, gabinete, fuenteDePoder, ventilador, refrigeracion, sistemaOperativo, restUsuario });
  } catch (error) {
    return res.status(500).json({
      error: `Algo salio mal...${error}`,
      code: 500,
    });
  }
});

  //Solicitud POST que recibe datos del formulario de solicitud y los envía a la base de datos.
  app.post("/solicitud", async(req, res) => {
    try {
      const idGlobal = uuidv4().split("-")[0];
      const datos = {...req.body};
      for (let clave in datos){
        await crearSolicitud( datos[clave], idGlobal);
        
      }
      res.status(201).json( {mensaje:"solicitud creada!"});
    } catch (error) {
      return res.status(500).json({
        error: `Algo salio mal...${error}`,
        codigo: 500,
      })
    }
});

/* Ruta que está protegida por un middleware que verifica si el usuario tiene una cookie llamada moonToken,
si no lo tiene, redirige a la página de inicio de sesión, si lo tiene, muestra la vista de las solicitudes. */
app.get("/misSolicitudes", cookieRutaProtegida, async (req, res) => {
  try {
    if (typeof validarToken(req.cookies.moonToken) == "undefined") {
      return res.redirect("/");
    }
    const { data } = validarToken(req.cookies.moonToken);
    const solicitudes = await solicitudesPorIdUsuario(data);
  
    const listaIdGlobal = solicitudes.map((s) => {
      return s.pedido_global;
    });
    idGlobalUnico = [...new Set(listaIdGlobal)];
    res.render("solicitudes", {idGlobalUnico});
  } catch (error) {
    res.status(500).json( { error: error});
  }
});

/*Ruta que está protegida por un middleware que verifica si el usuario tiene una cookie llamada moonToken,
si no lo tiene, redirige a la página de inicio de sesión, si lo tiene, envia las peticiones al front.*/
app.get("/solicitudes/:id",cookieRutaProtegida, async (req, res) => {
  try {
    if (typeof validarToken(req.cookies.moonToken) == "undefined") {
      return res.redirect("/");
    }
    const { id } = req.params;
    const detalleProducto = await productosPorIDGlobal(id);
    const solicitud = await solicitudPorIdGlobal(id);
    res.status(200).json( {detalleProducto, solicitud} );
  }catch(error){
    res.status(500).json( {error: error });
  }

});


