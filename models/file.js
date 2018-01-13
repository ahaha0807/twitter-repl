'use strict';
module.exports = (sequelize, DataTypes) => {
  var File = sequelize.define('File', {
    fileId: DataTypes.STRING,
    twitterId: DataTypes.STRING,
    language: DataTypes.STRING,
    code: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return File;
};