/*
Declaración y configuración de variables globales para la aplicación
*/

/*
Sección variables globales
*/
global.tiempoEnvioTrama;
global.fechaInicioVigenciaEnvioTrama;
global.tiempoActualizacionParametros;
global.fechaInicioVigenciaParametro;
global.idTanque;
global.userService;
global.passwordService;
global.ServiceRestToken;

let InitParametrosIniciales = (IdTanque, userService, passwordService) => {
    global.tiempoEnvioTrama = 15000; //600000; //Por defecto 10 minutos
    global.tiempoActualizacionParametros = 30000; //3600000;
    global.fechaInicioVigenciaParametro = new Date();
    global.fechaInicioVigenciaEnvioTrama = new Date();
    global.idTanque = IdTanque;
    global.userService = userService;
    global.passwordService = passwordService;
}

module.exports = {
    InitParametrosIniciales
}