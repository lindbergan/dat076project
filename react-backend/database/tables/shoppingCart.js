//The definition of a shoppingCart in the db
//(USER_ID, PRODUCT_ID, amount)

var db = require('../config/database').database;
var Sequelize = require('sequelize');

var shoppingCart = db.define('shoppingCart', {
  user_id:{
    type:     Sequelize.INTEGER,
    unique:   'compositeIndex'
  },
  product_id: {
    type:     Sequelize.INTEGER,
    unique:   'compositeIndex'
  }
  amount:     Sequelize.DOUBLE
});

// force: true will drop the table if it already exists
user.sync({force: true}).then(() => {
  // Table created and we know that the table is in sync, then we can populate...
});

module.exports.shoppingCart = shoppingCart; //export the table creation (and potential seeding of table)
