const sql = require("mysql");


//Raspberry

let DbConection = sql.createConnection({
    host: "192.168.0.131",
    user: "root",
    password: "Ic3827662/*",
    database: "SensoresDB"
});



//Server Ubuntu
/*
let DbConection = sql.createConnection({
    host: "192.168.0.142",
    user: "root",
    password: "Ic3827662/*",
    database: "SensoresDB"
});
*/
module.exports = {
    DbConection
};