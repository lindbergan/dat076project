//The definition of a shoppingCart in the db
//(USER_ID, PRODUCT_ID) ... don't think it should hold amount. Should rather be calculated in front-end

'use strict';
module.exports = (sequelize, DataTypes) => {
  var shoppingCart = sequelize.define('shoppingCart', {

    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'compositeIndex'
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'compositeIndex'
    },
    //amount:  DataTypes.DOUBLE
  }, {
    //here you can define certain table criteria, like disableing the time stamps
    timestamps: false,
  });
  shoppingCart.associate = function(models) {
    // associations can be defined here
  };

/************************************************************/
  shoppingCart.sync({force: true}).then(function (err) { //Now forces re-creation of tables

    //create test indexes... we could seed with dummy data here if we like (ie upon table creation)
    //test - for user_1 #products = 2
    shoppingCart.create({ product_id: 1, user_id: 1}).then(task => {});
    shoppingCart.create({ product_id: 2, user_id: 1}).then(task => {});
    //test - for user_2 #products = 2
    shoppingCart.create({ product_id: 1, user_id: 2}).then(task => {});
    shoppingCart.create({ product_id: 2, user_id: 2}).then(task => {});
  });
  /************************************************************/
  return shoppingCart;
};
