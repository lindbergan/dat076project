//The definition of a receipt in the db
//(ID, user_id,...) //maybe more attributes later on

'use strict';
module.exports = (sequelize, DataTypes) => {
  var receipt = sequelize.define('receipt', {
    id: {
      type:           Sequelize.INTEGER,
      autoIncrement:  TRUE,
      primaryKey:     TRUE
    },
    user_id:          Sequelize.INTEGER,
  }, {});
  receipt.associate = function(models) {
    // associations can be defined here
  };
  return receipt;
};
