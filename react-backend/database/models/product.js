//The definition of a product in the db
//(ID, price, description, product_pic, ... ) //maybe more attributes later on

'use strict';
module.exports = (sequelize, DataTypes) => {
  var product = sequelize.define('product', {

    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false
      //autoIncrement?? How do we want to handle this attribute
    },
    price: {
      type:       DataTypes.DOUBLE,
      allowNull: false
    },
    description:  DataTypes.TEXT,
    //product_pic:  sequelize.IMAGE ... Need to look up how to store images/pictures
  }, {
    //here you can define certain table criteria, like disableing the time stamps
    timestamps: false
  });
  product.associate = function(models) {
    // associations can be defined here
  };

/************************************************************/
  product.sync({force: true}).then(function (err) { //Now forces re-creation of tables

    //create test indexes... we could seed with dummy data here if we like (ie upon table creation)
    product.create({ product_id: 1, price: 10.0, description: 'aaaaa aaaa aaaaa aaa. aa aaaa'}).then(task => {});
    product.create({ product_id: 2, price: 20.0, description: 'bbbb bbbb bbb. bbb bbb b'}).then(task => {});
  });
  /************************************************************/
  return product;
};
