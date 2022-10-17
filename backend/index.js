const express = require('express');
const bodyParser = require('body-parser');
const docs = require('./docs');
const swaggerUi = require('swagger-ui-express');
const { registerUser, loginUsers, validate, getUser, getUsers, resetPassword, deleteUser, updateProfile, update_Password } = require('./database/user');
const { createService, getAllServices, getService, deleteService, updateService } = require('./database/service');
const { getAllCategories, getCategorieById } = require('./database/categories');
const { createAvis, updateAvis, deleteAvis } = require('./database/avis');

require("dotenv").config(); 

const app = express();
const router = express.Router();

router.use(bodyParser.urlencoded({ extended : false }));
router.use(bodyParser.json());

app.use(router);

//router.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/',swaggerUi.serve, swaggerUi.setup(docs));

router.post('/auth/register', registerUser);
router.post('/auth/token', loginUsers);
router.post('/validate', validate);
router.get('/user/:idUser', getUser);
router.get('/users', getUsers);
router.delete('/user', deleteUser);
router.put('/user', updateProfile);
router.put('/service/:idService', updateService);
router.post('/forget-password/:email', resetPassword)
router.post('/service', createService)
router.get('/services', getAllServices)
router.get('/service/:idService', getService)
router.post('/update-password', update_Password)
router.delete('/service/:idService', deleteService)
router.get('/categories', getAllCategories)
router.get('/categorie/:idCategorie', getCategorieById)
router.post('/avis/:idService', createAvis)
router.put('/avis/:idAvis', updateAvis)
router.delete('/avis/:idAvis', deleteAvis)





const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`L'API peut maintenant recevoir des requêtes http://localhost:` + port);
});