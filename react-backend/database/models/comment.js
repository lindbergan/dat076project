//The definition of a comment in the db
//(text, USER_ID, PRODUCT_ID, rating)

'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comments = sequelize.define('Comment', {
    text:       Sequelize.TEXT,
    user_id:{
      type:     Sequelize.INTEGER,
      unique:   'compositeIndex'
    },
    product_id:{
      type:     Sequelize.INTEGER,
      unique:   'compositeIndex'
    },
    rating:     Sequelize.DOUBLE
  }, {});
  Comments.associate = function(models) {
    // associations can be defined here
  };
  return Comments;
};
