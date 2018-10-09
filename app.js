const { InitParametrosIniciales } = require("./config");
const { InitPort } = require("./InitPort")
const logica = require("./Tilapiapp.Logica/ParametrosVariablesLogica");


InitParametrosIniciales();


var initParametrosGenerales;
var intervaloPrueba;

/*
USO DE DOS INTERVALOS
*/

//1. Apertura puerto

iniciarApp();

let iniciarApp = async() => {
    InitPort();
    IntervaloActualizacionParametros();
    IntervaloPrueba("Primera iteración");
}


//2. Enviar trama

let IntervaloPrueba = (ValorIntervalo) => {
    intervaloPrueba = setInterval(function() {
        console.log("Segundo Intervalo: ", ValorIntervalo);
    }, global.tiempoEnvioTrama);
};

//3. Actualizar parametros


let IntervaloActualizacionParametros = () => {
    initParametrosGenerales = setInterval(function() {
        // console.log("Tiempo Transcurrido: ", tiempoTranscurridoVigenciaParametros);
        console.log("Tiempo: ", global.tiempoActualizacionParametros);
        console.log("TiempoAlcanzado: set new time");
        global.tiempoActualizacionParametros = 20000;
        // global.fechaInicioVigenciaParametro = new Date();
        ReconstruirIntervalosTanque();

    }, global.tiempoActualizacionParametros);
}

let ReconstruirIntervalosTanque = async() => {
    await clearInterval(initParametrosGenerales);
    console.log("IntervaloActualizacionParametros borrado ");
    await clearInterval(intervaloPrueba);
    console.log("IntervaloPrueba borrado");
    IntervaloActualizacionParametros()
    IntervaloPrueba("Segunda iteración");
}

let fechaActual;
/*
let InitApp = () => {
        console.log("Inicia aplicación");


            while (true) {



                fechaActual = new Date();

                var tiempoTranscurridoVigenciaParametros = fechaActual.getTime() - global.fechaInicioVigenciaParametro.getTime();
                //var tiempoTranscurridoEnvioTrama = fechaActual.getTime() - global.fechaInicioVigenciaEnvioTrama.getTime();

                // Envio tramaif()

                // Actualizacion parametrosGenerales
                if (tiempoTranscurridoVigenciaParametros >= global.tiempoActualizacionParametros) {

                    console.log("Tiempo Transcurrido: ", tiempoTranscurridoVigenciaParametros);
                    console.log("Tiempo: ", global.tiempoActualizacionParametros);
                    console.log("TiempoAlcanzado: set new time");
                    global.tiempoActualizacionParametros = 20000;
                    global.fechaInicioVigenciaParametro = new Date();

                }

            }
            console.log("Finaliza aplicación");

        }
        */