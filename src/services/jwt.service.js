const jwt = require("jsonwebtoken");
const llaveSecreta = process.env.LLAVE_SECRETA;

const generadorDeToken = (usuario) => {
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 180,
      data: usuario,
    },
    llaveSecreta
  );
  console.log(token);
  return token;
};

const validarToken = (token)=>{
    let datos;
    jwt.verify(token, llaveSecreta, function(err, decoded){
        if(err){
            throw new Error("Token no valido");
        } else {
            datos = decoded;
        }
    })
    console.log(datos);
    return datos;
}

module.exports = {
  generadorDeToken,
  validarToken
};
