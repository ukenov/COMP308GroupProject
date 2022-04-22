const accountsResolver = require('./accounts.server');

const rootResolver = {
    ...accountsResolver
  };
  
module.exports = rootResolver;