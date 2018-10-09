const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const db = require('./Tilapiapp.AccesoDatos/DBTrama')
const logicaTrama = require('./Tilapiapp.Logica/TramaLogica');


var puerto = new SerialPort("COM4", {
    baudRate: 115200
});
const parser = puerto.pipe(new Readline({ delimiter: '\r\n' }))

let InitPort = async() => {
    console.log("Puerto en escucha")
    parser.on("data", async function(data) {

        logicaTrama.InsertTrama(data.toString());
        //db.SetTrama(data.toString());
        console.log("Trama obtenida: " + (data.toString()));
    });
}


module.exports = {
    InitPort
}