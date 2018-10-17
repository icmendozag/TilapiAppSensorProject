const request = require("request");

//#region Conexiones Rest

var getParametrosVariables = {
    method: 'GET',
    url: 'http://localhost:5000/Api/GetParametrosVariables',
    qs: { Id: global.idTanque },
    headers: { 'Content-Type': 'application/json' }
};



////#endregion




async function ActualizarParametrosVariables() {
    var result = await CallActualizarParametrosVariables(getParametrosVariables);
    return result;
}

let CallActualizarParametrosVariables = () => {

    return new Promise((resolve, reject) => {
        request(getParametrosVariables, function(err, response, body) {
            if (err) reject(err);
            if (response.statusCode == 200) {
                resolve(JSON.parse(body));
            } else {
                resjec(response.statusCode);
            }
        });
    });
}

async function EnviarTrama(idTrama, trama) {
    var result = await CallEnviarTrama(idTrama, trama);
    return result;
}


let CallEnviarTrama = (idTrama, trama) => {
    var sendTrama = {
        method: 'GET',
        url: 'http://localhost:5000/Api/registrarTrama',
        qs: {
            IdTrama: idTrama,
            Trama: trama
        },
        headers: { 'Content-Type': 'application/json' }
    };

    return new Promise((resolve, reject) => {
        request(sendTrama, function(err, response, body) {
            if (err) reject(err);
            if (response.statusCode == 200) {
                resolve(JSON.parse(body));
            } else {
                resjec(response.statusCode);
            }
        });
    });
}




module.exports = {
    ActualizarParametrosVariables,
    EnviarTrama
}