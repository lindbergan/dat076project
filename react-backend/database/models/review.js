//The definition of a review in the db
//(text, USER_ID, PRODUCT_ID, rating)

'use strict';
module.exports = (sequelize, DataTypes) => {
  var review = sequelize.define('review', {

    comment: DataTypes.TEXT,
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'compositeIndex'
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'compositeIndex'
    },
    rating: DataTypes.DOUBLE //should probably have a limit (between 0.0 - 5.0)

  }, {
    //here you can define certain table criteria, like disableing the time stamps
    timestamps: false,
  });
  review.associate = function(models) {
    // associations can be defined here
  };

/************************************************************/
  review.sync({force: true}).then(function (err) { //Now forces re-creation of tables

    //create test indexes... we could seed with dummy data here if we like (ie upon table creation)
    review.create({text: "abcd", user_id: 1, product_id: 1, rating: 3.0}).then(task => {});
    review.create({text: "efgh", user_id: 2, product_id: 2, rating: 4.2}).then(task => {});
  });
  /************************************************************/
  return review;
};
