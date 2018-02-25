//The definition of a comment in the db
//(text, USER_ID, PRODUCT_ID, rating)

var db = require('../config/database').database;
var Sequelize = require('sequelize');


var comment = db.define('comment', {
  text:       Sequelize.TEXT,
  user_id:{
    type:     Sequelize.INTEGER,
    unique:   'compositeIndex'
  },
  product_id:{
    type:     Sequelize.INTEGER,
    unique:   'compositeIndex'
  },
  rating:     Sequelize.DOUBLE
});

// force: true will drop the table if it already exists
user.sync({force: true}).then(() => {
  // Table created and we know that the table is in sync, then we can populate...
});

module.exports.comment = comment; //export the table creation (and potential seeding of table)
