//The definition of a product in the db
//(ID, price, description, image, ... ) //maybe more attributes later on

'use strict';
module.exports = (sequelize, DataTypes) => {
  var product = sequelize.define('product', {
    id: {
      type:           Sequelize.INTEGER,
      autoIncrement:  TRUE,
      primaryKey:     TRUE
    },
    price:            Sequelize.DOUBLE,
    description:      Sequelize.TEXT,
    //image:          Sequelize.IMAGE
  }, {});
  product.associate = function(models) {
    // associations can be defined here
  };
  return product;
};
