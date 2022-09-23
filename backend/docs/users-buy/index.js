const createUser = require('./create-user');
const getUser = require('./get-user');
const loginUser = require('./login-user');
const updateUser = require('./update-user');
const deleteUser = require('./delete-user');

module.exports = {
  paths:{
      '/auth/register':{
          ...createUser,
      },
      '/auth/token':{
        ...loginUser,
      },
      '/user/:idUser':{
        ...getUser,
        ...updateUser,
        ...deleteUser,
      },
  }
}