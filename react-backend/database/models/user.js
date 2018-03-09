//The definition of a user in the db
//(Id, email, role, profile_pic) //maybe more attributes later on
var dummyUsers = require('../dummyData/dummyUsers');
const models = require('path');

'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {

    user_id: {
      type:           DataTypes.STRING,
      primaryKey:     true,
      unique:         true,
      allowNull:      false
    },
    firstName:        DataTypes.STRING,
    lastName:         DataTypes.STRING,
    email: {
      type:           DataTypes.STRING,
      unique:         true,
      allowNull:      false
    },
    role:{
      type:           DataTypes.STRING,
      allowNull:      false
    },
    userimgurl:       DataTypes.STRING
  }, {
    //here one can define certain table criteria, like disableing the time stamps
    timestamps:       false
  });

        user.associate = function(models) {
            // associations can be defined here
            user.hasMany(models.cart, {
                foreignKeyConstraint: true,
                foreignKey: "user_id",
                onDelete: 'CASCADE'
            });
            user.hasMany(models.review, {
                foreignKeyConstraint: true,
                foreignKey: "user_id",
                onDelete: 'CASCADE'
            });
        };


/************************************************************/
  user.sync({force: true}).then(function (err) { //Now forces re-creation of tables

      user.bulkCreate(dummyUsers, {validate: true}).then(task => {});

  });
  /************************************************************/
  return user;
};
