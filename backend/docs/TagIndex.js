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
const ForgetPassword = require('./users/ForgetPassword');
const updatePassword = require('./users/updatePassword');
const deleteService = require('./services/delete-Service');
const getAllCategories = require('./categorieService/get-Allcategorie');
const getCategorieById = require('./categorieService/get-Categorie');


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
    '/forget-password/{email}':{
      ...ForgetPassword,
    },
    '/update-password':{
      ...updatePassword,
    },
    '/users':{
      ...getAllUsers,
    },
    '/user/{id}':{
      ...getUser,
    },
    '/user':{
      ...updateUser,
      ...deleteUser,
    },
    '/service':{
      ...createService,
    },
    '/services':{
      ...getAllService,
    },
    '/service/{id}':{
      ...getService,
      ...deleteService
    },
    '/categories':{
      ...getAllCategories,
    },
    '/categorie/{id}':{
      ...getCategorieById,
    }
  } 
}