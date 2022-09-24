const express = require("express");
const dotenv = require("dotenv");
const fs = require('fs');
dotenv.config();
const { v4: uuidv4 } = require('uuid');
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const expressFileUpload = require("express-fileupload");
const exphbs = require("express-handlebars");
const { listarCiudades, listarComunas, obtenerUsuarioPorId, obtenercomunaPorId, obtenerCiudadPorId, listarProcesador, listarPlacaMadre, listarMemoriaRAM, listarTarjetaGrafica, listarTarjetaDeRed, listarUnidadMDos, listarUnidadSSD, listarDiscoDuro, listarGabinete, listarFuenteDePoder, listarVentilador, listarRefrigeracion, listarSistemaOperativo, crearSolicitud, solicitudesPorIdUsuario, solicitudPorIdGlobal, productosPorIDGlobal, obtenerUsuariosDB, modificarActivoUsuario, modificarAdminUsuario, obtenerTipoProducto, crearProducto, obtenerProductoPorId, modificarProductoPorId, eiliminarProductoPorId, obtenerSolicitudes } = require("./src/services/db.service");
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

app.use(
    expressFileUpload({
      limits: 5000000, //tamaño limite para la carga de archivo
      abortOnLimit: true, //para que rebote la consulta al momento de superar el limite
      responseOnLimit: "El tamaño de la imagen supera el limite permitido", //mensaje para avisar al usuario
    })
  );

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


/* Ruta que está protegida por un middleware que verifica si el usuario tiene una cookie llamada moonToken,
si no lo tiene, redirige a la página de inicio de sesión, si lo tiene, renderiza el mantenedor de usuarios */ 
app.get("/mantenedorUsuarios", cookieRutaProtegida, async (req, res) => {
  try {
    if (typeof validarToken(req.cookies.moonToken) == "undefined") {
      return res.redirect("/");
    }
    const { data } = validarToken(req.cookies.moonToken);
    const usuario = await obtenerUsuarioPorId(data);
    if (usuario.es_admin) {
      const usuarios = await obtenerUsuariosDB();
      res.render("mantenedorUsuarios", { usuarios });
    }
    if (!usuario.es_admin) {
      res.redirect("/");
    }
  } catch (error) {
    res.status(500).json({
      error: `Algo salio mal...${error}`,
      code: 500,
    });
  }
});

app.get("/mantenedorProductos", cookieRutaProtegida, async (req, res) => {
  try {
    if (typeof validarToken(req.cookies.moonToken) == "undefined") {
      return res.redirect("/");
    }
    const { data } = validarToken(req.cookies.moonToken);
    const usuario = await obtenerUsuarioPorId(data);
    const tipoProductos = await obtenerTipoProducto();
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
    if (usuario.es_admin) {
      res.render("mantenedorProductos", {tipoProductos , procesador, placaMadre, memoriaRAM, tarjetaGrafica, tarjetaDeRed, unidadMDos, unidadSSD, discoDuro, gabinete, fuenteDePoder, ventilador, refrigeracion, sistemaOperativo});
    }
    if (!usuario.es_admin) {
      res.redirect("/");
    }
  } catch (error) {
    res.status(500).json({
      error: `Algo salio mal...${error}`,
      code: 500,
    });
  }
});

app.get("/mantenedorSolicitudes", cookieRutaProtegida, async (req, res) => {
  try {
    if (typeof validarToken(req.cookies.moonToken) == "undefined") {
      return res.redirect("/");
    }
    const { data } = validarToken(req.cookies.moonToken);
    const usuario = await obtenerUsuarioPorId(data);
    if (usuario.es_admin) {
      const solicitudes = await obtenerSolicitudes();
      const pedidosGlobales = [];
      for (indice in solicitudes) {
        pedidosGlobales.push(solicitudes[indice].pedido_global);
      }

      console.log(pedidosGlobales);
      const solicitudUnica = [...new Set(pedidosGlobales)];
      console.log(solicitudUnica);
      
      res.render("mantenedorSolicitudes", { solicitudUnica });
    }
    if (!usuario.es_admin) {
      res.redirect("/");
    }
  } catch (error) {
    res.status(500).json({
      error: `Algo salio mal...${error}`,
      code: 500,
    });
  }
});

//Ruta que se le pasa un middleware para proteger vistas de administrador y usuario
app.get("/home", cookieRutaProtegida, async (req, res) => {
  
  try {
    if(typeof validarToken(req.cookies.moonToken) == 'undefined'){
      return res.redirect('/');
    }
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

/* Ruta que se utiliza para activar o desactivar un usuario. */ 
app.put("/activar", async (req, res) => {
  const { id, estaActivo } = req.body;
  try {
    const usuario = await modificarActivoUsuario(id, estaActivo);
    res.status(200).json( {usuario});
  } catch (error) {
    res.status(500).json({
      error: `Algo salio mal...${error}`,
      code: 500,
    });
  }
});

/* Ruta que se utiliza para dar y quitar ROL de administrador. */
app.put("/rol", async (req, res) => {
  const { id, esAdmin} = req.body;
  try {
    const usuario = await modificarAdminUsuario(id, esAdmin);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({
      error: `Algo salio mal...${error}`,
      code: 500,
    });
  }
});

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
    if(restUsuario.es_admin){
      res.status(401).redirect('/');
    }
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

      console.log("datos backend",datos);
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

app.post("/productos", async (req, res) => {

  console.log(req.body);
  console.log(req.files);
  if(!req.files){
    return res.status(400).json( {error: "falta imagen del producto"});
  }
  const { foto }  = req.files;
  
  const { idTipoProducto, nombre, marca, precio, cantidad } = req.body;
  const tipoProducto = +idTipoProducto;
  console.log(tipoProducto);
  const idProducto = uuidv4().split("-")[1];
  
try {

const urlFoto = `${__dirname}/assets/uploads/${idProducto}.jpg`;
const urlFotoBD = `http://localhost:${puerto}/uploads/${idProducto}.jpg`
foto.mv(urlFoto, async(err)=>{
  if(err)return res.status(500).json({
    error:`Algo salió mal... ${err}`,
    code: 500
  });
  const producto = await crearProducto( { idProducto , tipoProducto, nombre, marca, precio, cantidad, urlFotoBD } );
  console.log(producto);
  res.status(201).json( { producto });
});


  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: `Algo salio mal... ${error}`,
      code: 500,
    });
  } 
}); 

app.put("/modificarProducto", async (req, res) => {
  console.log(req.body);
  const { nombre, marca, precio, cantidad, idProducto } = req.body;
  const precioInt = +precio;
  const cantidadInt = +cantidad;
  console.log(req.files);
  const urlFoto = `${__dirname}/assets/uploads/${idProducto}.jpg`;
  const urlFotoBD = `http://localhost:${puerto}/uploads/${idProducto}.jpg`;
  try {
    if (!req.files) {
      const productoModificado = await modificarProductoPorId({
        nombre,
        marca,
        precioInt,
        cantidadInt,
        idProducto,
        urlFotoBD,
      });
      return res.status(200).json( { productoModificado });
    }
    if (req.files) {
      const { foto } = req.files;
      console.log("url", urlFoto);
      fs.unlink(urlFoto, (err) => {
        if (err) {
          res.status(500).json({ error: err.message });
        }
      });
      foto.mv(urlFoto, async (err) => {
        if (err)
          return res.status(500).json({
            error: `Algo salió mal... ${err}`,
            code: 500,
          });
      });
      const productoModificado =  await modificarProductoPorId({
        nombre,
        marca,
        precioInt,
        cantidadInt,
        idProducto,
        urlFotoBD,
      });
      return res.status(200).json( { productoModificado });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: `Algo salio mal... ${error}`,
      code: 500,
    });
  }
});

app.put("/eliminarProducto", async (req, res) => {
  console.log(req.body);
  const { idProducto } = req.body;
  const activo = false;
  await eiliminarProductoPorId( {idProducto, activo });
  res.status(200).json({mensaje: "ok"});
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
    console.log(id);
    const detalleProducto = await productosPorIDGlobal(id);

    console.log(detalleProducto);

    const solicitud = await solicitudPorIdGlobal(id);

    console.log(solicitud);
    res.status(200).json( { detalleProducto, solicitud} );
  }catch(error){
    res.status(500).json( {error: error });
  }

});

app.get("/producto/:id",cookieRutaProtegida, async (req, res) => {
  try {
    if (typeof validarToken(req.cookies.moonToken) == "undefined") {
      return res.redirect("/");
    }
    const { id } = req.params;
    const producto = await obtenerProductoPorId(id);
    res.status(200).json( { producto } );
  }catch(error){
    res.status(500).json( {error: error });
  }

});


