const createUser = require('./users/create-user');
const getUser = require('./users/get-user');
const getAllUsers = require('./users/get-AllUser');
const loginUser = require('./users/login-user');
const updateUser = require('./users/update-user');
const deleteUser = require('./users/delete-user');
const validation = require('./users/validation-email');
const createService = require('./services/create-service');
const getService = require('./services/get-service');
const getAllService = require('./services/get-Allservice');
const getServiceByuser = require('./services/get-ServiceByUser');


module.exports = {
  paths:{
    '/auth/register':{
        ...createUser,
    },
    '/auth/token':{
      ...loginUser,
    },
    '/validate':{
      ...validation,
    },
    '/user/:id':{
      ...getUser,
    },
    '/user':{
      ...updateUser,
      ...deleteUser,
    },
    '/users':{
      ...getAllUsers,
    },
    '/service':{
      ...createService,
      ...getAllService
    },
    '/service/:id':{
      ...getService,
    },
    '/service/:idUser':{
      ...getServiceByuser,
    }
  } 
}