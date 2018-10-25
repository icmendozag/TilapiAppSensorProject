const serviceRest = require("../Tilapiapp.AccesoRestService/RestServiceManager")
const excepciones = require("./ManejoExcepcionesLogica");


let getTokenServicio = async() => {

    console.log("Ingreso servcio token");

    try {
        var result = await serviceRest.IniciarSesionServicio();
        console.log(result);
        global.serviceRestToken = result.token;
        global.tokenExpiration = result.expiration;
    } catch (error) {
        excepciones.RegistrarExcepcion(`Se genero error ${error}`, "InicioSesionLogica.getTokenServicio");
    }
}

module.exports = {
    getTokenServicio
}