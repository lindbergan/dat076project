//The definition of a shoppingCart in the db
const models = require('path');

'use strict';
module.exports = (sequelize, DataTypes) => {
  var cart = sequelize.define('cart', {

    product_id: {
        type:           DataTypes.INTEGER,
        references:     models.product,
        referencesKey:  "product_id",
        unique:         'compositeIndex'
    },
    user_id: {
      type:             DataTypes.STRING,
        references:     models.user,
        referencesKey:  "user_id",
        unique:         'compositeIndex'
    },
    amount:             DataTypes.INTEGER
  }, {
    //here one can define certain table criteria, like disableing the time stamps
    timestamps:         false,
  });

        cart.associate = function(models) {
            // associations can be defined here
            cart.belongsTo(models.user, {
                foreignKeyConstraint: true,
                foreignKey: "user_id",
                onDelete: 'CASCADE'
            });
            cart.belongsTo(models.product, {
                foreignKeyConstraint: true,
                foreignKey: "product_id",
                onDelete: 'CASCADE'
            });
        };

  return cart;
};
