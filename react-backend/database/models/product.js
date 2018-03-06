//The definition of a product in the db
//(ID, price, description, product_pic, ... ) //maybe more attributes later on

var dummyProducts = require('../dummyData/dummyProducts');

'use strict';
module.exports = (sequelize, DataTypes) => {
  var product = sequelize.define('product', {

    product_id: {
      type:       DataTypes.INTEGER,
      primaryKey: true,
      unique:     true,
      allowNull:  false
    },
    name:         DataTypes.STRING,
    price: {
      type:       DataTypes.INTEGER,
      allowNull:  false
    },
    description:  DataTypes.TEXT,
    prodimgurl:   DataTypes.STRING, //we save a generic dummy image in the folder "images" and just save the link to that folder
  }, {
    //here you can define certain table criteria, like disableing the time stamps
    timestamps:   false
  });
  product.associate = function(models) {
    // associations can be defined here
  };

/************************************************************/
  product.sync({force: true}).then(function (err) { //Now forces re-creation of tables

    product.bulkCreate(dummyProducts, {validate: true}).then(task => {});

  });
  /************************************************************/
  return product;
};
