const { InitParametrosIniciales } = require("./config");
const { InitPort } = require("./InitPort")
const parametrosLogica = require("./Tilapiapp.Logica/ParametrosVariablesLogica");
const logicaTrama = require("./Tilapiapp.Logica/TramaLogica");


InitParametrosIniciales();


var intervaloActualizacionParametros;
var intervaloEnviarTrama;

/*
USO DE DOS INTERVALOS
*/



let iniciarApp = async() => {
    InitPort();
    IntervaloActualizacionParametros();
    IntervaloEnviarTrama();
}

//1. Enviar trama

let IntervaloEnviarTrama = () => {
    intervaloEnviarTrama = setInterval(function() {
        logicaTrama.GetUltimaTrama();
    }, global.tiempoEnvioTrama);
};

//2. Actualizar parametros

let IntervaloActualizacionParametros = () => {
    intervaloActualizacionParametros = setInterval(function() {

        parametrosLogica.getParametrosVariables();
        // console.log("Tiempo Transcurrido: ", tiempoTranscurridoVigenciaParametros);
        //console.log("Tiempo: ", global.tiempoActualizacionParametros);
        //console.log("TiempoAlcanzado: set new time");
        global.tiempoActualizacionParametros = 20000;
        // global.fechaInicioVigenciaParametro = new Date();
        ReconstruirIntervalosTanque();

    }, global.tiempoActualizacionParametros);
}



//#region Generar Intervalos

let ReconstruirIntervalosTanque = async() => {

    await clearInterval(intervaloActualizacionParametros);
    console.log("IntervaloActualizacionParametros borrado ");
    await clearInterval(intervaloEnviarTrama);
    console.log("IntervaloPrueba borrado");
    IntervaloActualizacionParametros()
    IntervaloEnviarTrama();

}

//#endregion


iniciarApp();