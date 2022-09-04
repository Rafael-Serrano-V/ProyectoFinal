const express = require("express");
const dotenv = require("dotenv");
dotenv.config(); 
const app = express();
/* const expressFileUpload = require("express-fileupload"); */
const exphbs = require('express-handlebars');
const { listarCiudades, listarComunas} = require('./src/services/db.service');
const { rutasUsuario } = require('./src/routes/usuarios.routes');

const puerto = process.env.PUERTO_SERVIDOR;

// Escuchando el puerto definido en archivo .env
app.listen(puerto, ()=> console.log("Servidor Funcionando!"));

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
  app.get("/registro", async(req, res)=>{
  
  try {
    const ciudades = await listarCiudades();
    const comunas = await listarComunas();
    res.render("registro", { ciudades, comunas });
    } 
    catch (error) {
      res.status(500).send({
        error: `Algo salio mal...${error}`,
        code: 500,
      });
    }
    
  });

 //Ruta que renderiza la vista login
 app.get("/", (req, res)=>{
    res.render("login");
  });

 //Middleware que está usando la ruta /usuario y la ruta rutasUsuario.
  app.use('/usuario', rutasUsuario); 