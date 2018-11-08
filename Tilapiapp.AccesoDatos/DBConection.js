const sql = require("mysql");

//Raspberry
/*
let DbConection = sql.createConnection({
    host: "192.168.0.17",
    user: "root",
    password: "Ic3827662/*",
    database: "SensoresDB"
});
*/
/*
let DbConection = sql.createConnection({
    host: "192.168.0.131",
    user: "pi",
    password: "Ic3827662/*-",
    database: "SensoresDB"
});
*/
let DbConection = sql.createConnection({
    host: "192.168.0.131",
    user: "pi",
    password: "Tilapi@ppPi",
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