var configValues = require("./config");

module.exports = {
  getDbConnectionString: function() {
    return 'mongodb://' + configValues.username + ':' + configValues.password + '@proj-319-150.cs.iastate.edu:27017/cycloud';
  },

  'port': process.env.PORT || 3000,
  'secret': configValues.secret
};
