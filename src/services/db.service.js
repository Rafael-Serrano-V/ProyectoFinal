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

//Toma una idComuna y devuelve la fila en la tabla de comunas que tiene esa idComuna.
const obtenercomunaPorId = async (idComuna) => {
  const consulta = {
    text: "SELECT * FROM comunas WHERE id_comuna=$1",
    values: [idComuna],
  }
  const resultado = await pool.query(consulta);
  return resultado.rows[0];
}

//Toma un idCiudad, y devuelve la fila de la tabla de regiones que tiene ese id.
const obtenerCiudadPorId = async (idCiudad) => {
  const consulta = {
    text: "SELECT * FROM regiones WHERE id_region=$1",
    values: [idCiudad],
  }
  const resultado = await pool.query(consulta);
  return resultado.rows[0];
}

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


//Devuelve una promesa que se resuelve en una matriz de objetos con los usuarios de la base de datos.
const obtenerUsuariosDB = async () => {
  const resultado = await pool.query("SELECT * FROM usuarios");
  return resultado.rows;
};

//Toma un ID que representa el id_usuario y un valor booleano que representa la activacion y actualiza la base de datos con el valor booleano.
//modifica la actividad del usuario.
const modificarActivoUsuario = async(id, estaActivo)=>{
  const consulta = {
      text: "UPDATE usuarios SET esta_activo=$1 WHERE id_usuario=$2 RETURNING *",
      values: [estaActivo, id],
  }

  const result = await pool.query(consulta);
  return result.rows[0];
}

//Toma un ID que representa el id_usuario y un valor booleano que representa si es administrador y actualiza la base de datos con el valor booleano.
//modifica el rol de administrador.
const modificarAdminUsuario = async(id, esAdmin)=>{
  const consulta = {
      text: "UPDATE usuarios SET es_admin=$1 WHERE id_usuario=$2 RETURNING *",
      values: [esAdmin, id],
  }

  const result = await pool.query(consulta);
  return result.rows[0];
}

//Toma el id del usuario como argumento y devuelve una promesa que se resuelve en un objeto con los datos del usuario.
const obtenerUsuarioPorId = async (id) => {
  const consulta = {
    text: "SELECT * FROM usuarios WHERE id_usuario=$1",
    values: [id],
  };
  const resultado = await pool.query(consulta);
  return resultado.rows[0];
}

//Actualiza la información del usuario en la base de datos
const actualizarUsuario = async(nombre, apellido, contacto, direccion, comuna, correo)=>{
  const consulta  = {
      text: "UPDATE usuarios SET nombre = $1, apellido = $2, telefono = $3, direccion = $4, id_comuna = $5 WHERE email = $6",
      values: [nombre, apellido, contacto, direccion, comuna, correo],
  }

  return await pool.query(consulta);
}

//Se crean consultas para obtener listas de cada uno de los tipos de productos.

const listarProcesador = async ()=>{
  const consulta = {
    text: "SELECT * FROM productos WHERE id_tipo_producto = $1",
    values: [1],
  }

  const resultado = await pool.query(consulta);
  return resultado.rows;
}

const listarPlacaMadre = async ()=>{
  const consulta = {
    text: "SELECT * FROM productos WHERE id_tipo_producto = $1",
    values: [2],
  }

  const resultado = await pool.query(consulta);
  return resultado.rows;
}

const listarMemoriaRAM = async ()=>{
  const consulta = {
    text: "SELECT * FROM productos WHERE id_tipo_producto = $1",
    values: [3],
  }

  const resultado = await pool.query(consulta);
  return resultado.rows;
}

const listarTarjetaGrafica = async ()=>{
  const consulta = {
    text: "SELECT * FROM productos WHERE id_tipo_producto = $1",
    values: [4],
  }

  const resultado = await pool.query(consulta);
  return resultado.rows;
}

const listarTarjetaDeRed = async ()=>{
  const consulta = {
    text: "SELECT * FROM productos WHERE id_tipo_producto = $1",
    values: [5],
  }

  const resultado = await pool.query(consulta);
  return resultado.rows;
}

const listarUnidadMDos = async ()=>{
  const consulta = {
    text: "SELECT * FROM productos WHERE id_tipo_producto = $1",
    values: [6],
  }

  const resultado = await pool.query(consulta);
  return resultado.rows;
}

const listarUnidadSSD = async ()=>{
  const consulta = {
    text: "SELECT * FROM productos WHERE id_tipo_producto = $1",
    values: [7],
  }

  const resultado = await pool.query(consulta);
  return resultado.rows;
}

const listarDiscoDuro = async ()=>{
  const consulta = {
    text: "SELECT * FROM productos WHERE id_tipo_producto = $1",
    values: [8],
  }

  const resultado = await pool.query(consulta);
  return resultado.rows;
}

const listarGabinete = async ()=>{
  const consulta = {
    text: "SELECT * FROM productos WHERE id_tipo_producto = $1",
    values: [10],
  }

  const resultado = await pool.query(consulta);
  return resultado.rows;
}

const listarFuenteDePoder = async ()=>{
  const consulta = {
    text: "SELECT * FROM productos WHERE id_tipo_producto = $1",
    values: [11],
  }

  const resultado = await pool.query(consulta);
  return resultado.rows;
}

const listarVentilador = async ()=>{
  const consulta = {
    text: "SELECT * FROM productos WHERE id_tipo_producto = $1",
    values: [12],
  }

  const resultado = await pool.query(consulta);
  return resultado.rows;
}

const listarRefrigeracion = async ()=>{
  const consulta = {
    text: "SELECT * FROM productos WHERE id_tipo_producto = $1",
    values: [13],
  }

  const resultado = await pool.query(consulta);
  return resultado.rows;
}
const listarSistemaOperativo = async ()=>{
  const consulta = {
    text: "SELECT * FROM productos WHERE id_tipo_producto = $1",
    values: [14],
  }

  const resultado = await pool.query(consulta);
  return resultado.rows;
}

////////////////////////////////////////////////////////////////////////////////////////////

//Crea una nueva fila en la tabla de solicitudes, y luego disminuye el stock del producto.
const crearSolicitud = async ( {idUsuario, idProducto}, idGlobal)=> {
  
    const consulta = {
      text: "INSERT INTO solicitudes (pedido_global, id_usuario, id_producto, esta_completado) VALUES ($1, $2, $3, $4) RETURNING *",
      values: [idGlobal, idUsuario, idProducto, false ],
    };
    
    const descontarStock = {
      text: `UPDATE productos SET cantidad = cantidad - 1 WHERE id_producto= $1`,
      values: [idProducto]
  }

  try{
    await pool.query('BEGIN');
    await pool.query(consulta);
    await pool.query(descontarStock);
    await pool.query('COMMIT');

  } catch (error) {
    await pool.query('ROLLBACK');
    return error;
  }
}

//Devuelve todas las filas de la tabla "solicitudes" donde la columna "id_usuario" es igual al parámetro idUsuario.
const solicitudesPorIdUsuario = async(idUsuario)=>{
  const consulta = {
    text: "SELECT * FROM solicitudes WHERE id_usuario=$1",
    values: [idUsuario]
  }

  const resultado = await pool.query(consulta);
  return resultado.rows;
}

//Devuelve las filas de una tabla llamada "solicitudes" donde la columna "pedido_global" es igual al parámetro idGlobal.
const solicitudPorIdGlobal = async(idGlobal)=>{
  const consulta = {
    text: "SELECT * FROM solicitudes WHERE pedido_global=$1",
    values: [idGlobal]
  }

  const resultado = await pool.query(consulta);
  return resultado.rows;
}

//Devuelve el nombre, marca, precio y foto de un producto que se encuentra en un pedido global.
const productosPorIDGlobal = async(id) => {
  const consulta = {
    text: "SELECT nombre, marca, precio, foto FROM productos INNER JOIN solicitudes ON productos.id_producto = solicitudes.id_producto WHERE pedido_global=$1",
    values: [id]
  }
  const resultado = await pool.query(consulta);
  return resultado.rows;
}

//Se exportan las funciones para ser utilizadas en otros archivos
module.exports = {
  listarCiudades,
  listarComunas,
  crearUsuarioDB,
  obtenerUsuarioPorCorreo,
  obtenerUsuariosDB,
  obtenerUsuarioPorId,
  obtenercomunaPorId,
  obtenerCiudadPorId,
  actualizarUsuario,
  listarPlacaMadre,
  listarProcesador,
  listarMemoriaRAM,
  listarTarjetaGrafica,
  listarTarjetaDeRed,
  listarUnidadMDos,
  listarUnidadSSD,
  listarDiscoDuro,
  listarGabinete,
  listarVentilador,
  listarRefrigeracion,
  listarSistemaOperativo,
  listarFuenteDePoder,
  crearSolicitud,
  solicitudesPorIdUsuario,
  solicitudPorIdGlobal,
  productosPorIDGlobal,
  modificarActivoUsuario,
  modificarAdminUsuario

};
