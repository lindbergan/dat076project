//The definition of a shoppingCart in the db
//(USER_ID, PRODUCT_ID, amount)

'use strict';
module.exports = (sequelize, DataTypes) => {
  var shoppingCart = sequelize.define('shoppingCart', {
    user_id:{
      type:     Sequelize.INTEGER,
      unique:   'compositeIndex'
    },
    product_id: {
      type:     Sequelize.INTEGER,
      unique:   'compositeIndex'
    }
    amount:     Sequelize.DOUBLE
  }, {});
  shoppingCart.associate = function(models) {
    // associations can be defined here
  };
  return shoppingCart;
};
