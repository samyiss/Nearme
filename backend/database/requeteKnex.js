const knexModule = require('knex');
const chaineConnexion = require('./dbConnexion');

const knex = knexModule(chaineConnexion);

// Requete de test
function getIppesAll() {
    return knex('categories');
}

module.exports = {
    getIppesAll
};
