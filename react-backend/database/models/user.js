//The definition of a user in the db
//(Id, email, role, profile_pic) //maybe more attributes later on

'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {

    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false
      //autoIncrement?? How do we want to handle this attribute
    },
    firstName:      DataTypes.STRING,
    lastName:       DataTypes.STRING,
    email: {
      type:         DataTypes.STRING,
      unique:       true,
      allowNull: false
    },
    role:{
      type:           DataTypes.STRING,
      allowNull: false
    }
    //profile_pic:  sequelize.IMAGE ... Need to look up how to store images/pictures
  }, {
    //here you can define certain table criteria, like disableing the time stamps
    timestamps: false
  });
  user.associate = function(models) {
    // associations can be defined here
  };

/************************************************************/
  user.sync({force: true}).then(function (err) { //Now forces re-creation of tables

    //create test indexes... we could seed with dummy data here if we like (ie upon table creation)
    user.create({ user_id: 1, firstName: 'foo', lastName: 'bar', email:'foo@bar', role: 'admin'}).then(task => {});
    user.create({ user_id: 2, firstName: 'foo2', lastName: 'bar2', email:'foo2@bar2', role: 'customer'}).then(task => {});
  });
  /************************************************************/
  return user;
};
