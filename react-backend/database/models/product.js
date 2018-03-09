//The definition of a product in the db
const models = require('path');

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
    //here one can define certain table criteria, like disableing the time stamps
    timestamps:   false
  });

    product.associate = function(models) {
        // associations can be defined here
        product.hasMany(models.cart, {
            foreignKeyConstraint: true,
            foreignKey: "product_id",
            onDelete: 'CASCADE'
        });
        product.hasMany(models.review, {
            foreignKeyConstraint: true,
            foreignKey: "product_id",
            onDelete: 'CASCADE'
        });
    };

  return product;
};
