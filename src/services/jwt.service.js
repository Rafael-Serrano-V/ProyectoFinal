const jwt = require("jsonwebtoken");
const llaveSecreta = process.env.LLAVE_SECRETA;

//Toma un objeto de usuario y devuelve un token.
const generadorDeToken = (usuario) => {
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + (60 * 30),
      data: usuario,
    },
    llaveSecreta
  );
  return token;
};

//Devuelve el token decodificado pasado como parametro, pero antes los verifica.
const validarToken = (token)=>{
  
    let datos;
    jwt.verify(token, llaveSecreta, function(err, decoded){
        if(err){
            return err;
        } else {
            datos = decoded;
        }
    })
    return datos;
}
 
   

//Exporta las funciones para que puedan ser utilizadas en otros archivos.
module.exports = {
  generadorDeToken,
  validarToken
};
