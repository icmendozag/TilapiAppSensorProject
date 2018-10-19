const request = require("request");
const excepciones = require("../Tilapiapp.Logica/ManejoExcepcionesLogica");


var getParametrosVariables = {
    method: 'GET',
    url: 'http://localhost:53347/Api/GetParametrosVariables',
    qs: { Id: global.idTanque },
    headers: { 'Content-Type': 'application/json' }
};

let CallEnviarTrama = (idTrama, trama) => {
    var sendTrama = {
        method: 'GET',
        url: 'http://localhost:53347/Api/registrarTrama',
        qs: {
            IdTrama: idTrama,
            Trama: trama
        },
        headers: { 'Content-Type': 'application/json' }
    };

    return new Promise((resolve, reject) => {
        request(sendTrama, function(err, response, body) {
            if (err) reject(err);
            if (response != null) {
                if (response.statusCode == 200) {
                    resolve(JSON.parse(body));
                }
            } else {
                reject(err)
            }
        });
    });
}

async function EnviarTrama(idTrama, trama) {
    var result = await CallEnviarTrama(idTrama, trama);
    return result;
}

let CallActualizarParametrosVariables = () => {

    return new Promise((resolve, reject) => {
        request(getParametrosVariables, function(err, response, body) {
            if (err) reject(err);
            if (response != null) {
                if (response.statusCode == 200) {
                    resolve(JSON.parse(body));
                }
            } else {
                reject(err)
            }
        });
    });
}

async function ActualizarParametrosVariables() {
    var result = await CallActualizarParametrosVariables(getParametrosVariables);
    return result;
}

module.exports = {
    ActualizarParametrosVariables,
    EnviarTrama
}