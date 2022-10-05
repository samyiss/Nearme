const knexModule = require('knex');
const chaineConnexion = require('./dbConnexion');

const knex = knexModule(chaineConnexion);

// Requete de test
async function addService(service) {
    let row = []
    await knex('services').insert(service).then(async () => {
        await knex('services').select().then((rows) => {
            row.push(rows[rows.length - 1]);
        })
    }).catch((err) => {
        console.log(err);
        throw err;
    })
    return row;
}

//get les données de la table services
function getServices() {
    return knex('services');
}

module.exports = {
    addService,
    getServices
};
