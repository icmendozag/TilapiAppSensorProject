const { InitParametros } = require("./config");
const { InitPort } = require("./InitPort");
const parametrosLogica = require("./Tilapiapp.Logica/ParametrosVariablesLogica");
const logicaTrama = require("./Tilapiapp.Logica/TramaLogica");
const logicaIniciSesion = require("./Tilapiapp.Logica/InicioSesionLogica");
const argv = require('./yargs').argv;

let idTanque = argv._[1];
let userService = argv._[3];
let passwordService = argv._[5];

if (idTanque != null && userService != null && passwordService != null) {

    InitParametros(idTanque, userService, passwordService);

    var intervaloActualizacionParametros;
    var intervaloEnviarTrama;
    var intervaloEnviarEstadoTarjeta;

    /*
    USO DE DOS INTERVALOS
    */

    let iniciarApp = async() => {
        await logicaIniciSesion.getTokenServicio();
        await parametrosLogica.getParametrosVariables();
        InitPort();
        IntervaloActualizacionParametros();
        IntervaloEnviarTrama();
        IntervaloEstadoTarjeta();
    }

    //1. Enviar trama

    let IntervaloEnviarTrama = () => {
        intervaloEnviarTrama = setInterval(function() {
            logicaTrama.SendTrama();
        }, global.tiempoEnvioTrama);
    };

    //2. Actualizar parametros

    let IntervaloActualizacionParametros = () => {
        intervaloActualizacionParametros = setInterval(function() {
            parametrosLogica.getParametrosVariables();
            ReconstruirIntervalosTanque();
        }, global.tiempoActualizacionParametros);
    }


    //3. Intervalo enviar estado activo tarjeta

    let IntervaloEstadoTarjeta = () => {
        intervaloEnviarEstadoTarjeta = setInterval(function() {
            logicaTrama.SendEstadoTarjeta();
        }, 10000)
    }

    //#region Generar Intervalos
    let ReconstruirIntervalosTanque = async() => {
        await clearInterval(intervaloActualizacionParametros);
        await clearInterval(intervaloEnviarTrama);
        await clearInterval(intervaloEstadoTarjeta);
        await logicaIniciSesion.getTokenServicio();
        IntervaloActualizacionParametros()
        console.log("IntervaloActualizacionParametros actualizado");
        IntervaloEnviarTrama();
        console.log("intervaloEnviarTrama actualizado");
        IntervaloEstadoTarjeta();
    }

    //#endregion
    iniciarApp();

} else {
    console.log("Debe registrar parametros de entrada para iniciar la aplicacion. Tanque, Usuario, Password");
}