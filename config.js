/*
Declaración y configuración de variables globales para la aplicación
*/
/*
Sección variables globales
*/
global.tiempoEnvioTrama;
global.idTanque;
global.loginService;
global.serviceRestToken;
global.tokenExpiration;
//global.urlServicioWeb = 'http://localhost:53347/Api/';
//global.urlServicioWeb = 'http://192.168.0.10:5000/Api/';
global.urlServicioWeb = 'http://192.168.0.175:5000/Api/';

let InitParametros = async(IdTanque, userService, passwordService) => {

    try {
        global.tiempoActualizacionParametros = 3600000; //3600000;    
        global.idTanque = IdTanque;
        global.loginService = { userName: userService, passWord: passwordService };
    } catch (error) {
        console.log("Error: ", error);
    }


}

module.exports = {
    InitParametros
}