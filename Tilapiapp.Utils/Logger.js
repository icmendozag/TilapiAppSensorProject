const fs = require('fs');


let registrarLog = async(errorMessage) => {
    let fechaActual = new Date();
    let logerFile = `Logs/${fechaActual.getDate()}-${fechaActual.getMonth() + 1}-${fechaActual.getFullYear()}-log.txt`;
    data = `${errorMessage}\n`
    fs.appendFile(logerFile, data, function(err) {
        if (err) throw err;
    })
}

module.exports = {
    registrarLog
}