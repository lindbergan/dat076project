//The definition of a shoppingCart in the db
//(USER_ID, PRODUCT_ID) ... don't think it should hold amount. Should rather be calculated in front-end
var dummyCarts = require('../dummyData/dummyCarts');

'use strict';
module.exports = (sequelize, DataTypes) => {
  var shoppingCart = sequelize.define('shoppingCart', {

    product_id: {
      type:           DataTypes.INTEGER,
      allowNull:      false,
      unique:         'compositeIndex'
    },
    user_id: {
      type:           DataTypes.INTEGER,
      allowNull:      false,
      unique:         'compositeIndex'
    },
    amount:           DataTypes.INTEGER
  }, {
    //here you can define certain table criteria, like disableing the time stamps
    timestamps:       false,
  });
  shoppingCart.associate = function(models) {
    // associations can be defined here
      //shoppingCart.belongsTo(models.user, {
      //  foreignkey: 'user_id',
      //});
      //shoppingCart.belongsTo(models.product, {
      //  foreignkey: 'product_id',
      //});
  };

/************************************************************/
  shoppingCart.sync({force: true}).then(function (err) { //Now forces re-creation of tables

      shoppingCart.bulkCreate(dummyCarts, {validate: true, ignoreDuplicates: true}).then(task => {});

  });
  /************************************************************/
  return shoppingCart;
};
