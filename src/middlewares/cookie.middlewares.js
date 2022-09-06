//Si la cookie no esta presente, se redirije a la página de registro, en caso de que exista se pasa al siguiente middleware
const cookieRutaProtegida = (req, res, next)=> {
    if(!req.cookies.moonToken){
        return res.redirect('/registro');
    }
    next();
}

//Exporta middleware
module.exports = {
    cookieRutaProtegida
}