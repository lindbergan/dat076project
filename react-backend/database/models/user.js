//The definition of a user in the db
//(Id, email, role, profile_pic) //maybe more attributes later on
var dummyUsers = require('../dummyData/dummyUsers');

'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {

    user_id: {
      type:           DataTypes.INTEGER,
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
    //here you can define certain table criteria, like disableing the time stamps
    timestamps:       false
  });
  user.associate = function(models) {
    // associations can be defined here
  };

/************************************************************/
  user.sync({force: true}).then(function (err) { //Now forces re-creation of tables

      user.bulkCreate(dummyUsers, {validate: true}).then(task => {});

  });
  /************************************************************/
  return user;
};
