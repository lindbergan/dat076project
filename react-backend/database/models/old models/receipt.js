//The definition of a receipt in the db
//(ID, user_id, shoppingCart_id) //maybe more attributes later on.. need to be able to get shoppingCart content... basically only need to hold information about shoppingcart

'use strict';
module.exports = (sequelize, DataTypes) => {
  var receipt = sequelize.define('receipt', {

    receipt_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false
      //autoIncrement?? How do we want to handle this attribute
    },
    user_id: {
      type:      DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    //product_pic:  sequelize.IMAGE ... Need to look up how to store images/pictures
  }, {
    //here you can define certain table criteria, like disableing the time stamps
    timestamps: false
  });
  receipt.associate = function(models) {
    // associations can be defined here
  };

/************************************************************/
  receipt.sync({force: true}).then(function (err) { //Now forces re-creation of tables

    //create test indexes... we could seed with dummy data here if we like (ie upon table creation)
    receipt.create({ receipt_id: 1, user_id: 1}).then(task => {});
    receipt.create({ receipt_id: 2, user_id: 2}).then(task => {});
  });
  /************************************************************/
  return receipt;
};
