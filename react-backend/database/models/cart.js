//The definition of a shoppingCart in the db
//(USER_ID, PRODUCT_ID) ... don't think it should hold amount. Should rather be calculated in front-end
var dummyCarts = require('../dummyData/dummyCarts');

'use strict';
module.exports = (sequelize, DataTypes) => {
  var cart = sequelize.define('cart', {

/*    cart_id: {
      type:           DataTypes.INTEGER,
      primaryKey:     true,
      unique:         true,
      allowNull:      false,
      autoIncrement:  true
    },*/
    product_id: {
      type:           DataTypes.INTEGER,
      allowNull:      false,
      unique:         'compositeIndex'
    },
    user_id: {
      type:           DataTypes.STRING,
      allowNull:      false,
      unique:         'compositeIndex'
    },
    amount:           DataTypes.INTEGER
  }, {
    //here you can define certain table criteria, like disableing the time stamps
    timestamps:       false,
  });
  cart.associate = function(models) {
    // associations can be defined here
    //  cart.belongsTo(models.user, {
    //       foreignKey:  {
    //           primaryKey: true,
    //           foreignKey: "user_id"
    //       },
    //       onDelete: 'CASCADE'});
    //   cart.belongsTo(models.product, {
    //       foreignKey: {
    //           primaryKey: true,
    //           foreignKey: "product_id"
    //       },
    //       onDelete: 'CASCADE'});
  };

/************************************************************/
    cart.sync({force: true}).then(function (err) { //Now forces re-creation of tables

        cart.bulkCreate(dummyCarts, {validate: true, ignoreDuplicates: true}).then(task => {});

  });
  /************************************************************/
  return cart;
};
