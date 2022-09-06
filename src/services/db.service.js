const { Pool } = require("pg");

//Se crea un Pool de conexiones a la base de datos.
const pool = new Pool({
  host: process.env.POOL_HOST,
  user: process.env.POOL_USER,
  password: process.env.POOL_PASSWORD,
  port: process.env.POOL_PORT,
  database: process.env.POOL_DATABASE,
});
//Devuelve una promesa que se resuelve en una matriz de objetos, el cual retorna el resultado de la consulta
const listarCiudades = async () => {
  const resultado = await pool.query("SELECT * FROM regiones");
  return resultado.rows;
};

//Devuelve una promesa que se resuelve en una matriz de objetos, cada objeto representa una fila en la tabla comunas.
const listarComunas = async () => {
  const resultado = await pool.query("SELECT * FROM comunas");
  return resultado.rows;
};

//Toma un objeto con los datos del usuario y lo inserta en la base de datos, se devuelve el resultado de la consulta.
const crearUsuarioDB = async ({ nombre, apellido, correo, hash, telefono, direccion, idComuna }) => {
  try {
    const consulta = {
      text: "INSERT INTO usuarios (nombre, apellido, email, contrasenia, telefono, direccion, id_comuna, esta_activo, es_admin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      values: [ nombre, apellido, correo, hash, telefono, direccion, idComuna, false, false ],
    };
    const resultado = await pool.query(consulta);
    return resultado.rows[0];
  } catch (error) {
    const { detail } = error;
    return detail;
  }
};

//Toma el correo del usuario como argumento y devuelve una promesa que se resuelve en un objeto con los datos del usuario.
const obtenerUsuarioPorCorreo = async (correo) => {
  const consulta = {
    text: "SELECT * FROM usuarios WHERE email=$1",
    values: [correo],
  };
  const resultado = await pool.query(consulta);
  return resultado.rows[0];
};


/* const obtenerUsuariosDB = async () => {
  const resultado = await pool.query("SELECT * FROM usuarios");
  return resultado.rows;
}; */

//Toma el id del usuario como argumento y devuelve una promesa que se resuelve en un objeto con los datos del usuario.
const obtenerUsuarioPorId = async (id) => {
  const consulta = {
    text: "SELECT * FROM usuarios WHERE id_usuario=$1",
    values: [id],
  };
  const resultado = await pool.query(consulta);
  return resultado.rows[0];
}

//Se exportan las funciones para ser utilizadas en otros archivos
module.exports = {
  listarCiudades,
  listarComunas,
  crearUsuarioDB,
  obtenerUsuarioPorCorreo,
  //obtenerUsuariosDB,
  obtenerUsuarioPorId
};
