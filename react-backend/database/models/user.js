//The definition of a user in the db
//(Id, email, role, profile_pic) //maybe more attributes later on

'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    id: {
      type:         Sequelize.INTEGER,
      autoIncrement:TRUE,
      primaryKey:   TRUE
    },
    firstName:      sequelize.STRING,
    lastName:       sequelize.STRING,
    email:          sequelize.STRING,
    role:           sequelize.STRING
    //profile_pic:  sequelize.IMAGE
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};
