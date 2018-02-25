//The definition of a user in the db
//(Id, email, role, profile_pic) //maybe more attributes later on

//const dummyUsers = require('../dummyData/dummyUsers');

//var db = require('../config/database').database;
//var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
var User = sequelize.define('user', {
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
});
return User
};

// force: true will drop the table if it already exists
//user.sync({force: true}).then(() => {
  // Table created and we know that the table is in sync, then we can populate...
  //return user.create({
    //firstName:  'John',
    //lastName:   'Hancock',
    //email:      'john@hancock.com',
    //role:       'admin'
    //...here we could seed the db with any dummy data
    //return dummyUsers.populate();
//});

//module.exports.user = user; //export the table creation (and potential seeding of table)
