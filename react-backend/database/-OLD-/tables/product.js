//The definition of a product in the db
//(ID, price, description, image, ... ) //maybe more attributes later on

var db = require('../config/database').database;
var Sequelize = require('sequelize');

var shoppingCart = db.define('product', {
  id: {
    type:           Sequelize.INTEGER,
    autoIncrement:  TRUE,
    primaryKey:     TRUE
  },
  price:            Sequelize.DOUBLE,
  description:      Sequelize.TEXT,
  //image:          Sequelize.IMAGE
});

// force: true will drop the table if it already exists
user.sync({force: true}).then(() => {
  // Table created and we know that the table is in sync, then we can populate...
});

module.exports.product = product; //export the table creation (and potential seeding of table)
