const { InitParametrosIniciales } = require("./config");
const { InitPort } = require("./InitPort")
const logica = require("./Tilapiapp.Logica/ParametrosVariablesLogica");


InitParametrosIniciales();


var intervaloActualizacionParametros;
var intervaloEnviarTrama;

/*
USO DE DOS INTERVALOS
*/

//1. Apertura puerto



let iniciarApp = async() => {
    InitPort();
    IntervaloActualizacionParametros();
    IntervaloEnviarTrama();
}

//2. Enviar trama

let IntervaloEnviarTrama = () => {
    intervaloEnviarTrama = setInterval(function() {
        console.log("Segundo Intervalo: ");
    }, global.tiempoEnvioTrama);
};

//3. Actualizar parametros

let IntervaloActualizacionParametros = () => {
    intervaloActualizacionParametros = setInterval(function() {
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