const knexModule = require('knex');
const chaineConnexion = require('./dbConnexion');

const knex = knexModule(chaineConnexion);

// Requete de test
function addService(service) {
    return knex('services').insert(service)
    
}

// Requete de test
function getAllCategories() {
    return knex('categories');
}

// Requete de test
function getCategorieById(id) {
    return knex('categories')
                .where('id_categorie', id);;
}

//get les données de la table services
function getServices() {
    return knex('services');
}

//get les données de la table services
function getService(id) {
    return knex('services')
                .join('categories', 'categories.id_categorie', 'services.id_categorie')
                .where('id_service', id);
}

//get les données de la table services
function getServiceByUser(id) {
    return knex('services').where('id_user', id);
}

//delete les données de la table services
async function deleteService(id) {
    await knex('services').where('id_service', id).del()
    const data = await getService(id);
    if (data.length === 0) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    addService,
    getServices,
    getService,
    getServiceByUser,
    deleteService,
    getAllCategories,
    getCategorieById
};
