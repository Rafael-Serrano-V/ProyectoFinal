const { Router } = require('express');
const { crearUsuario, modificarUsuario } = require('../controllers/usuarios.controllers');

//Se crea una nueva instancia de la clase Router
const enrutador = new Router();

//Ruta de usuario para el método POST
enrutador.post('/', crearUsuario);
enrutador.put('/', modificarUsuario);


//Exporta el objeto de enrutador
module.exports = {
    rutasUsuario: enrutador,
}