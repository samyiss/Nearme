const createUser = require('./create-user');
const getUser = require('./get-user');
const loginUser = require('./login-user');
const updateUser = require('./update-user');
const deleteUser = require('./delete-user');
const validation = require('./validation-email');

module.exports = {
  paths:{
      '/register':{
          ...createUser,
      },
      '/auth/token':{
        ...loginUser,
      },
      '/validate':{
        ...validation,
      },
      '/user':{
        ...getUser,
        ...updateUser,
        ...deleteUser,
      },
  }
}