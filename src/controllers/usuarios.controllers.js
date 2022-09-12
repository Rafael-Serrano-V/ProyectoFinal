const { crearUsuarioDB, obtenerUsuarioPorCorreo, actualizarUsuario } = require("../services/db.service");
const bcrypt = require("bcrypt");
const { generadorDeToken } = require("../services/jwt.service");

//Crea un usuario en la base de datos.
const crearUsuario = async (req, res) => {
  try {
    const { nombre, apellido, correo, telefono, direccion, comuna, contrasenia } = req.body;
    const idComuna = Number(comuna);
    const saltRounds = 10;
    bcrypt.hash(contrasenia, saltRounds, function (err, hash) {
      crearUsuarioDB({ nombre, apellido, correo, hash, telefono, direccion, idComuna });
      res.status(201).json({ mensaje: "usuario creado" });
    });
  } catch (error) {
    return res.status(500).json({
      error: `Algo salio mal...${error}`,
      codigo: 500,
    });
  }
};

/*  
 Comprueba si el usuario existe en la base de datos, si existe, comprueba si la contraseña es correcta, si lo es, 
 comprueba si el usuario está activo, si lo está, genera un token y lo envía al cliente. 
 */
const postLoginUsuario = async (req, res) => {
  const { correo, contrasenia} = req.body;
  if (!correo || !contrasenia) return res.status(400).json({ error: "Faltan Parametros" });
  const usuario = await obtenerUsuarioPorCorreo(correo);
  if (usuario) {
    const { contrasenia: contra, ...restUsuario } = usuario;
    bcrypt.compare(contrasenia, usuario.contrasenia, (err, result) => {
      if (result) {
        if (usuario.esta_activo) {
          const token = generadorDeToken(restUsuario.id_usuario);
          res.cookie("moonToken", token, { httpOnly: true });
          return res.status(200).json({ usuario: restUsuario, token });
        } else {
          return res.status(401).json({
            mensaje: "Este usuario aún no ha sido autorizado",
            code: 401,
          });
        }
      } else {
        return res.status(403).json({ mensaje: "contraseña erronea" });
      }
    });
  } else {
    return res.status(404).json({
      error: "Este usuario no está registrado en la base de datos",
      code: 404,
    });
  }
};

//Toma los datos del cuerpo de la solicitud y luego llama a la función actualizarUsuario, que es el que actualiza la base de datos.
const modificarUsuario = async(req, res) => {
  const { nombre, apellido, contacto, direccion, comuna, correo } = req.body;
  try {
    await actualizarUsuario(nombre, apellido, contacto, direccion, comuna, correo);
    res.status(200).json( { mensaje: "Usuario modificado exitosamente" });
  } catch (error) {
    res.status(500).json( {error});
  }
}

/* const obtenerUsuarios = async (req, res) => {
      try {
        const token = req.headers.authorization.split(" ").pop();
        console.log(token);
        const datosToken = await validarToken(token);
        console.log(datosToken);
        const usuario = await obtenerUsuarioPorId(datosToken.data);
        console.log(usuario);
        if (!usuario)
          return res.status(404).json({ error: "Usuario no encontrado" });
        if (!usuario.esta_activo)
          return res.status(403).json({ error: "Cuenta sin acceso" });

          const usuarios = await obtenerUsuariosDB();
          const usuariosSeguros = usuarios.map((usuario) => {
            const { contrasenia, ...restUsuario } = usuario;
            return restUsuario;
          });
          res.status(200).json({ usuarios: usuariosSeguros });
      } catch (error) {
        res.status(500).json({error: error.message});
      }
    }; */

//Se exportan las funciones para ser utilizados por otros archivos.
module.exports = {
  crearUsuario,
  postLoginUsuario,
  modificarUsuario
};
