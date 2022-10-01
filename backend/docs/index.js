const basicInfo = require('./basicInfo');
const servers = require('./servers');
const tags = require('./tags');
const components = require('./components');
const users = require('./TagIndex');
const services = require('./TagIndex');

module.exports = {
    ...basicInfo,
    ...servers,
    ...tags,
    ...components,
    ...users,
    ...services
};


