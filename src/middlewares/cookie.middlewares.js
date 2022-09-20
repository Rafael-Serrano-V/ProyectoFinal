//Si la cookie no esta presente, se redirije a la página de registro, en caso de que exista se pasa al siguiente middleware
const cookieRutaProtegida = (req, res, next)=> {
    if(typeof req.cookies.moonToken === 'undefined' || req.cookies.moonToken == null || req.cookies.moonToken == ""){
        return res.redirect('/');
    }
    next();
}

//Exporta middleware
module.exports = {
    cookieRutaProtegida
}