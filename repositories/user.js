'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    twitterID: DataTypes.STRING,
    projectID: DataTypes.STRING,
    isConnect: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};