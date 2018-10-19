const opts = {
    tanque: {
        demand: true,
        alias: 'id'
    },
    user: {
        demand: true,
        alias: 'us'
    },
    password: {
        demand: true,
        alias: 'ps'
    }
};

const argv = require('yargs')
    .command('tanque', 'Indica el número del tanque donde se encuentra el sensor', opts)
    .command('user', 'Indica el usuario de conexión para el servicio', opts)
    .command('password', 'Indica el password de conexión pare el servicio', opts)
    .help()
    .argv;

module.exports = {
    argv
}