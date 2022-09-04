const express = require("express");


const dotenv = require("dotenv");
dotenv.config(); 
const app = express();
/* const expressFileUpload = require("express-fileupload"); */
const exphbs = require('express-handlebars');
/* const { listarCiudades, listarComunas} = require('./src/services/db.service');
const { rutasUsuario } = require('./src/routes/usuarios.routes'); */
const puerto = process.env.PUERTO_SERVIDOR;

app.listen(puerto, ()=> console.log("Servidor Funcionando!"));

// Middlewares
/* app.use(express.json()); // recibir payload de las consultas post y put */
app.use(express.static(__dirname + "/assets")); 

app.engine(
  "handlebars",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: `${__dirname}/views/layouts`,
  })
);
app.set("view engine", "handlebars");
/* app.use(
    expressFileUpload({
      limits: 5000000, //tamaño limite para la carga de archivo
      abortOnLimit: true, //para que rebote la consulta al momento de superar el limite
      responseOnLimit: "El tamaño de la imagen supera el limite permitido", //mensaje para avisar al usuario
    })
  ); */



  app.get("/", async(req, res)=>{
    res.render("registro");
 /*  try {
    const ciudades = await listarCiudades();
    const comunas = await listarComunas();
    res.render("registro", { ciudades, comunas });
    } 
    catch (error) {
      res.status(500).send({
        error: `Algo salio mal...${error}`,
        code: 500,
      });
    } */
    
  });

 /*  app.get("/login", (req, res)=>{
    res.render("login");
  });

  app.use('/usuario', rutasUsuario);  */