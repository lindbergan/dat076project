//The definition of a receipt in the db
//(ID, user_id,...) //maybe more attributes later on

var db = require('../config/database').database;
var Sequelize = require('sequelize');

var shoppingCart = db.define('receipt', {
  id: {
    type:           Sequelize.INTEGER,
    autoIncrement:  TRUE,
    primaryKey:     TRUE
  },
  user_id:          Sequelize.INTEGER,
});

// force: true will drop the table if it already exists
user.sync({force: true}).then(() => {
  // Table created and we know that the table is in sync, then we can populate...
});

module.exports.receipt = receipt; //export the table creation (and potential seeding of table)
