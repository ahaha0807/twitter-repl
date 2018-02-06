'use strict'
module.exports = (sequelize, DataTypes) => {
    var Editor = sequelize.define('Editor', {
        projectID: DataTypes.STRING,
        code: DataTypes.STRING,
        lineIndex: DataTypes.INTEGER,
        language: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    })
    return Editor
}