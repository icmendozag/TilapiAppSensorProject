const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const logicaTrama = require('./Tilapiapp.Logica/TramaLogica');


let InitPort = async() => {

    try {

        /*
var puerto = new SerialPort("/dev/ttyS0", {
    baudRate: 9600
});
*/

        var puerto = new SerialPort("COM4", {
            baudRate: 115200
        });

        const parser = puerto.pipe(new Readline({ delimiter: '\r\n' }))

        console.log("Puerto en escucha")
        parser.on("data", async function(data) {
            logicaTrama.InsertTrama(data.toString());
            //db.SetTrama(data.toString());
            console.log("Trama obtenida: " + (data.toString()));
        });
    } catch (error) {
        console.log("Error: ", error);
    }

}

module.exports = {
    InitPort
}