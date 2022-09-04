const { crearUsuarioDB } = require('../services/db.service');
const bcrypt = require('bcrypt');

//Crea un usuario en la base de datos.
const crearUsuario = async (req, res) => {
    try {
        console.log(req.body);
        const {nombre, apellido, correo, telefono, direccion, comuna, contrasenia } = req.body;
        const idComuna = Number(comuna);
        const saltRounds = 10;
        bcrypt.hash(contrasenia, saltRounds, function(err, hash) {
            crearUsuarioDB( { nombre, apellido, correo, hash, telefono, direccion, idComuna } );
            res.status(201).json( {message: 'usuario creado' }); 
        });
        
    } catch (error) {
        return res.status(500).json({
            error: `Algo salio mal...${error}`,
            code: 500,
          });
    }
}

//Exporta la función `crearUsuario` para que pueda ser utilizada en otros archivos. 
module.exports = {
    crearUsuario,
}