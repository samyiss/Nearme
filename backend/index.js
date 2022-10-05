const express = require('express');
const bodyParser = require('body-parser');
const docs = require('./docs');
const swaggerUi = require('swagger-ui-express');
const { registerUser, loginUsers, validate, getUser, getUsers, resetPassword, deleteUser, updateProfile, update_Password } = require('./database/user');
const { createService, getAllServices } = require('./database/service');

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
router.get('/user/:id', getUser);
router.get('/users', getUsers);
router.delete('/user', deleteUser);
router.put('/user', updateProfile);
router.post('/forget-password/:email', resetPassword)
router.post('/service', createService)
router.get('/services', getAllServices)
router.post('/update-password', update_Password)



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`L'API peut maintenant recevoir des requêtes http://localhost:` + port);
});